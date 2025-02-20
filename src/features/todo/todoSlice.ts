import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import ErrorWithCode from "../../app/ErrorWithCode.ts";
import {v4 as uuidv4} from "uuid";
import {RootState} from "../redux/store.ts";

const DEFAULT_TODO_TITLE: string = 'Unnamed';

interface iTodo {
    id: string,
    title: string,
    colorId: string,
    tasks: string[],
}

interface iTodoState {
    byId: Record<string, iTodo>,
    allIds: Set<string>,
    updated: Set<string>,
    deleted: Set<string>,
}

const initialState: iTodoState = {
    byId: {},
    allIds: new Set<string>(),
    updated: new Set<string>(),
    deleted: new Set<string>(),
}

export const enum todoSliceErrors {
    NO_SUCH_TODO,
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
            state.allIds = new Set<string>();
            state.deleted = new Set<string>();
            state.updated = new Set<string>();

            for (const todo of action.payload.todos) {
                state.byId[todo.id] = todo;
                state.allIds.add(todo.id);
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

            // Todo Надо добавить проверку на пустоту title, вероятно имеет смысл это сделать именно в компонентах
            if (!state.updated.has(action.payload.id)) state.updated.add(action.payload.id);
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
            state.byId[id] = {id: id, title: DEFAULT_TODO_TITLE, colorId: action.payload.colorId, tasks: []}
            state.updated.add(id);
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

            delete state.byId[action.payload.id];
            if (state.updated.has(action.payload.id)) state.updated.delete(action.payload.id);
            if (state.allIds.has(action.payload.id)) state.allIds.delete(action.payload.id);
            state.deleted.add(action.payload.id);
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

            if (!state.updated.has(action.payload.id)) state.updated.add(action.payload.id);
            todo.colorId = action.payload.colorId;
        },
    }
})

export const selectTodoById = (state: RootState, id: string) => state.todo.byId[id];
export const selectTodoIds = createSelector([
        (state: RootState) => state.todo.allIds,],
    (todoAllIds) => [...todoAllIds]);

export const {
    setTodos,
    addTodo,
    updateTodoColor,
    updateTodoTitleText,
    removeTodo,
} = todoSlice.actions;

export default todoSlice.reducer;