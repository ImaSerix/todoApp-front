import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import ErrorWithCode from "../../../app/utils/ErrorWithCode.ts";
import {v4 as uuidv4} from 'uuid';
import {RootState} from "../../../app/redux/store.ts";
import loadData from "../../../app/redux/loadData.ts";

const DEFAULT_TASK_CONTENT: string = 'Empty';

export interface iTask {
    id: string;
    content: string;
    todoId: string;
    completed: boolean;
}

interface iTaskState {
    byId: Record<string, iTask>,
    allIds: string[],
    byTodoId:Record<string, string[]>,
    updated: string[],
    deleted: string[],
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected',
}

const initialState: iTaskState = {
    byId: {},
    allIds: [],
    byTodoId: {},
    updated: [],
    deleted: [],
    loading: 'idle',
}

export const enum taskSliceErrors {
    NO_SUCH_TASK,
}

const deleteFromArray = (arr: string[], value: string) => {
    const indexOf = arr.indexOf(value);
    if (indexOf == -1) return arr;
    arr[indexOf] = arr[arr.length - 1];
    arr.pop();
    return arr;
}

const taskSlice = createSlice({
    name: "task",
    initialState: initialState,
    reducers: {
        /**
         *
         * Sets tasks to state.
         *
         * @param {iTaskState} state - The current state of the tasks.
         * @param {PayloadAction<{ tasks: Task[] }} action - An action object with the `tasks` fetched from server.
         * @param {iTask[]} action.payload.tasks - List with tasks from server.
         *
         * @returns {void} This reducer doesn't return any value
         */
        setTasks: (state: iTaskState, action: PayloadAction<{ tasks: iTask[] }>): void => {
            state.byId = {};
            state.allIds = [];
            state.deleted = [];
            state.updated = [];

            for (const task of action.payload.tasks) {
                state.byId[task.id] = task;
                state.allIds.push(task.id);
            }
        },
        /**
         * Toggles the completion status of a task.
         *
         * @param {iTaskState} state - The current state of the tasks.
         * @param {PayloadAction<{id:string}>} action - An action object with the `id` of the task to toggle.
         * @param {string} action.payload.id - The ID of the task to toggle.
         *
         * @throws {ErrorWithCode<taskSliceErrors>} `taskSliceErrors.NO_SUCH_TASK` if no task with the provided `id` is found.
         *
         * @returns {void} This reducer doesn't return any value
         */
        toggleTaskStatus: (state: iTaskState, action: PayloadAction<{ id: string }>): void => {
            const task = state.byId[action.payload.id];
            if (!task) throw new ErrorWithCode(`No such task with id: '${action.payload.id}'`, taskSliceErrors.NO_SUCH_TASK);

            if (!state.updated.includes(action.payload.id)) state.updated.push(action.payload.id);
            task.completed = !task.completed;
        },
        /**
         *
         * Updates `content` of the task
         *
         * @param {iTaskState} state - The current state of the tasks.
         * @param {PayloadAction<{id:string, content:string}>} action - An action object with the `id` and `content` to update.
         * @param {string} action.payload.id - The `id` of the task to update.
         * @param {string} action.payload.content - The new content
         *
         * @throws {ErrorWithCode<taskSliceErrors>} `taskSliceErrors.NO_SUCH_TASK` if no task with the provided `id` is found.
         *
         * @returns {void} This reducer doesn't return any value
         */
        updateTaskContent: (state: iTaskState, action: PayloadAction<{ id: string, content: string }>): void => {
            const task = state.byId[action.payload.id];
            if (!task) throw new ErrorWithCode(`No such task with id: '${action.payload.id}'`, taskSliceErrors.NO_SUCH_TASK);

            if (!state.updated.includes(action.payload.id)) state.updated.push(action.payload.id);
            task.content = action.payload.content;
        },
        /**
         *
         * Ads new task.
         *
         * @param {iTaskState} state - The current state of the tasks.
         * @param {PayloadAction<todoId: string>} action - An action object with the `todoId`, to which belongs task
         * @param {string} action.payload.todoId - id of the to-do to which belongs task
         *
         * @returns {void} This reducer doesn't return any value
         */
        addTask: (state: iTaskState, action: PayloadAction<{ todoId: string }>): void => {
            const id = uuidv4();
            state.byId[id] = {id: id, todoId: action.payload.todoId, content: DEFAULT_TASK_CONTENT, completed: false};
            state.allIds.push(id);
            if (!state.byTodoId[action.payload.todoId]) state.byTodoId[action.payload.todoId] = [];
            state.byTodoId[action.payload.todoId].push(id)
            state.updated.push(id);
        },
        /**
         *
         * Deletes task, also tracks deleted task ids, for next sync with server.
         *
         * @param {iTaskState} state - The current state of the tasks.
         * @param {PayloadAction<{id:string}>} action - An action object with the `id`
         * @param {string} action.payload.id - The `id` of the task to delete.
         *
         * @throws {ErrorWithCode<taskSliceErrors>} `taskSliceErrors.NO_SUCH_TASK` if no task with the provided `id` is found.
         *
         * @returns {void} This reducer doesn't return any value
         */
        removeTask: (state: iTaskState, action: PayloadAction<{ id: string }>): void => {
            // delete state.byId[action.payload.id];
            const task = state.byId[action.payload.id];

            deleteFromArray(state.updated, task.id);
            deleteFromArray(state.allIds, task.id);
            state.byTodoId[task.todoId] = state.byTodoId[task.todoId].filter(id => id !== action.payload.id);
            state.deleted.push(action.payload.id);
        },
        /**
         *
         * @param state
         * @param action
         */
        removeTasks: (state: iTaskState, action: PayloadAction<{ ids: string[] }>): void => {
            action.payload.ids.forEach(taskId => {
                deleteFromArray(state.updated, taskId);
                deleteFromArray(state.allIds, taskId);
                state.byTodoId[taskId] = state.byTodoId[taskId].filter(id => id !== taskId);
                state.deleted.push(taskId);
            });
        }
    },
    extraReducers: builder => {
        builder.addCase(loadData.pending, (state) => {
            state.loading = 'pending';
        });
        builder.addCase(loadData.fulfilled, (state, action) => {
            state.loading = 'fulfilled';

            state.byId = {};
            state.allIds = [];
            state.byTodoId = {};
            state.deleted = [];
            state.updated = [];

            const taskData = action.payload.tasks;

            taskData.forEach(task => {
                if (!(task.todoId in state.byTodoId)) state.byTodoId[task.todoId] = [];
                state.byTodoId[task.todoId].push(task.id);
                state.byId[task.id] = task;
                state.allIds.push(task.id);
            })
        })
    }
})

export const selectDeletedTaskIds = (state:RootState) => {
    return state.task.deleted;
}

export const selectUpdatedTasks = (state: RootState) => {
    return state.task.updated.map(taskId => state.task.byId[taskId]);
}
export const selectTaskLoading = (state: RootState) => state.task.loading;

export const selectTaskById = (state:RootState, taskId:string) => state.task.byId[taskId];

export const selectTaskIdsByTodoId = createSelector([
        (_: RootState, todoId: string) => todoId,
        (state: RootState) => state.task.byTodoId],
    (todoId, tasksByTodoId) => {
        return tasksByTodoId[todoId] || [];
    })

export const selectAreAllTasksOfTodoIdCompleted = createSelector([
    (_: RootState, todoId: string) => todoId,
    (state:RootState) => state.task.byId,
    (state:RootState) => state.task.byTodoId],
    (todoId, tasksById,tasksByTodoId) => {
        return tasksByTodoId[todoId]?.every((id) => tasksById[id]?.completed);
    })

export const {
    setTasks,
    toggleTaskStatus,
    updateTaskContent,
    removeTask,
    addTask,
    removeTasks,
} = taskSlice.actions;

export default taskSlice.reducer;