import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import ErrorWithCode from "../../app/ErrorWithCode.ts";
import {v4 as uuidv4} from 'uuid';
import {RootState} from "../../app/redux/store.ts";

const DEFAULT_TASK_CONTENT: string = 'Empty';

export interface iTask {
    id: string;
    content: string;
    todoId: string;
    completed: boolean;
}

interface iTaskState {
    byId: Record<string, iTask>,
    allIds: Set<string>,
    updated: Set<string>,
    deleted: Set<string>,
}

const initialState: iTaskState = {
    byId: {},
    allIds: new Set<string>(),
    updated: new Set<string>(),
    deleted: new Set<string>(),
}

export const enum taskSliceErrors {
    NO_SUCH_TASK,
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
            state.allIds = new Set<string>();
            state.deleted = new Set<string>();
            state.updated = new Set<string>();

            for (const task of action.payload.tasks) {
                state.byId[task.id] = task;
                state.allIds.add(task.id);
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

            if (!state.updated.has(action.payload.id)) state.updated.add(action.payload.id);
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

            if (!state.updated.has(action.payload.id)) state.updated.add(action.payload.id);
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
            state.updated.add(id);
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
            if (state.updated.has(action.payload.id)) state.updated.delete(action.payload.id);
            if (state.allIds.has(action.payload.id)) state.allIds.delete(action.payload.id);
            state.deleted.add(action.payload.id);
        },
        /** todo Write docs
         *
         * @param state
         * @param action
         */
        removeTasks: (state: iTaskState, action: PayloadAction<{ ids: string[] }>): void => {
            action.payload.ids.forEach(taskId => {
                if (state.updated.has(taskId)) state.updated.delete(taskId);
                if (state.allIds.has(taskId)) state.allIds.delete(taskId);
                state.deleted.add(taskId)
            });
        }
    }
})


export const selectUpdatedAndDeleted = createSelector([
        (state: RootState) => state.task.updated,
        (state: RootState) => state.task.deleted],
    (updated, deleted) => {
        return {updated, deleted}
    }
)

// Version which return iTask[] as updatedTasks and string[] as deletedTasks
// export const selectUpdatedAndDeleted = (state: RootState) => {
//     const updatedTasks: iTask[] = [];
//     const deletedTasks: string[] = [...state.task.deleted];
//
//     state.task.updated.forEach(key => {
//         updatedTasks.push(state.task.byId[key]);
//     })
//
//     return {updatedTasks, deletedTasks}
// }

export const selectTaskById = createSelector([
        (_:RootState, taskId: string) => taskId,
        (state: RootState) => state.task.byId],
    (taskId, tasksById) => tasksById[taskId],
)
export const selectAreAllTasksCompleted = createSelector([
        (_:RootState, taskIds: string[]) => taskIds,
        (state: RootState) => state.task.byId],
    (taskIds, tasksById) => {
        return taskIds.every(id => tasksById[id]?.completed);
    }
)

export const {
    setTasks,
    toggleTaskStatus,
    updateTaskContent,
    removeTask,
    addTask,
    removeTasks,
} = taskSlice.actions;

export default taskSlice.reducer;