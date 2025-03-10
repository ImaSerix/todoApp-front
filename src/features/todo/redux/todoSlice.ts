import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import ErrorWithCode from "../../../app/utils/ErrorWithCode.ts";
import {v4 as uuidv4} from "uuid";
import {RootState} from "../../../app/redux/store.ts";
import loadData from "../../../app/redux/loadData.ts";

const DEFAULT_TODO_TITLE: string = 'Unnamed';

export interface iTodo {
    id: string,
    title: string,
    colorId: string,
}

interface iTodoState {
    byId: Record<string, iTodo>,
    allIds: string[],
    updated: string[],
    deleted: string[],
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected',
}

const initialState: iTodoState = {
    byId: {},
    allIds: [],
    updated: [],
    deleted: [],
    loading: 'idle',
}

export const enum todoSliceErrors {
    NO_SUCH_TODO,
}

const deleteFromArray = (arr: string[], value: string) => {
    const indexOf = arr.indexOf(value);
    if (indexOf == -1) return arr;
    arr[indexOf] = arr[arr.length - 1];
    arr.pop();
    return arr;
}

const todoSlice = createSlice({
    name: "todo",
    initialState: initialState,
    reducers: {
        /**
         *
         * Sets todos to state.
         *
         * @param {iTodoState} state - The current state of the to-do.
         * @param {PayloadAction<{ todos: iTodo[] }} action - An action object with the `todos` fetched from server.
         * @param {iTodo[]} action.payload.tasks - List with todos from server.
         *
         * @returns {void} This reducer doesn't return any value
         */
        setTodos: (state: iTodoState, action: PayloadAction<{ todos: iTodo[] }>): void => {
            state.byId = {};
            state.allIds = [];
            state.deleted = [];
            state.updated = [];

            for (const todo of action.payload.todos) {
                state.byId[todo.id] = todo;
                state.allIds.push(todo.id);
            }
        },
        /**
         *
         * Updated `title` of the task
         *
         * @param {iTodoState} state - The current state of the to-do.
         * @param {PayloadAction<{id:string, title:string}>} action - An action object with the `id` and `title` to update.
         * @param {string} action.payload.id - The `id` of the to-do to update.
         * @param {string} action.payload.content - The new title
         *
         * @throws {ErrorWithCode<todoSliceErrors>} `todoSliceErrors.NO_SUCH_TODO` if no to-do with the provided `id` is found.
         *
         * @returns {void} This reducer doesn't return any value
         */
        updateTodoTitleText: (state: iTodoState, action: PayloadAction<{ id: string, title: string }>): void => {
            const todo = state.byId[action.payload.id];
            if (!todo) throw new ErrorWithCode<todoSliceErrors>(`No such todo with id: '${action.payload.id}'`, todoSliceErrors.NO_SUCH_TODO);

            if (!state.updated.includes(action.payload.id)) state.updated.push(action.payload.id);
            todo.title = action.payload.title;
        },
        /**
         *
         * Ads new to-do.
         *
         * @param {iTodoState} state - The current state of the to-do.
         * @param {PayloadAction<colorId: string>} action - An action object with the `colorId` of which color to-do is.
         * @param {string} action.payload.colorId - id of the color of which is to-do
         *
         * @returns {void} This reducer doesn't return any value
         */
        addTodo: (state: iTodoState, action: PayloadAction<{ colorId: string }>): void => {
            const id = uuidv4();
            state.byId[id] = {
                id: id,
                title: DEFAULT_TODO_TITLE,
                colorId: action.payload.colorId,
                //taskIds: [],
            };
            state.allIds.push(id);
            state.updated.push(id);
        },
        /**
         *
         * Deletes to-do, also tracks deleted to-do ids, for next sync with server.
         *
         * @param {iTodoState} state - The current state of the to-do.
         * @param {PayloadAction<{id:string}>} action - An action object with the `id`
         * @param {string} action.payload.id - The `id` of the to-do to delete.
         *
         * @throws {ErrorWithCode<todoSliceErrors>} `todoSliceErrors.NO_SUCH_TODO` if no to-do with the provided `id` is found.
         *
         * @returns {void} This reducer doesn't return any value
         */
        removeTodo: (state: iTodoState, action: PayloadAction<{ id: string }>): void => {
            const todo = state.byId[action.payload.id];
            if (!todo) throw new ErrorWithCode(`No such todo with id: '${action.payload.id}'`, todoSliceErrors.NO_SUCH_TODO);

            //Line below enables hard delete
            //delete state.byId[action.payload.id];
            deleteFromArray(state.updated, action.payload.id);
            deleteFromArray(state.allIds, action.payload.id);
            state.deleted.push(action.payload.id);
        },
        /**
         *
         * Updates `colorId` of the task
         *
         * @param {iTodoState} state - The current state of the to-do.
         * @param {PayloadAction<{id:string, colorId:string}>} action - An action object with the `id` and `colorId` to update.
         * @param {string} action.payload.id - The `id` of the task to update.
         * @param {string} action.payload.content - The new `colorId`
         *
         * @throws {ErrorWithCode<todoSliceErrors>} `todoSliceErrors.NO_SUCH_TODO` if no to-do with the provided `id` is found.
         *
         * @returns {void} This reducer doesn't return any value
         */
        updateTodoColor(state: iTodoState, action: PayloadAction<{ id: string, colorId: string }>): void {
            const todo = state.byId[action.payload.id];
            if (!todo) throw new ErrorWithCode(`No such todo with id: '${action.payload.id}'`, todoSliceErrors.NO_SUCH_TODO);

            if (!state.updated.includes(action.payload.id)) state.updated.push(action.payload.id);
            todo.colorId = action.payload.colorId;
        },
    },
    extraReducers: builder => {
        builder.addCase(loadData.pending, (state) => {
            state.loading = 'pending';
        });
        builder.addCase(loadData.fulfilled, (state, action) => {
            state.loading = 'fulfilled';

            state.byId = {};
            state.allIds = [];
            state.updated = [];
            state.deleted = [];

            const todosData = action.payload.todos;

            todosData.forEach(todo => {
                state.byId[todo.id] = todo;
                state.allIds.push(todo.id);
            })
        })
    }
})

export const selectTodoById = (state: RootState, id: string) => state.todo.byId[id];
export const selectTodoIds = (state: RootState) => state.todo.allIds;
export const selectTodoLoading = (state: RootState) => state.todo.loading;
export const selectUpdatedTodos = (state: RootState) => state.todo.updated.map(todoId => state.todo.byId[todoId])
export const selectDeletedTodoIds = (state: RootState) => state.todo.deleted;

export const {
    setTodos,
    //removeTaskFromTodo,
    addTodo,
    updateTodoColor,
    updateTodoTitleText,
    removeTodo,
} = todoSlice.actions;

export default todoSlice.reducer;