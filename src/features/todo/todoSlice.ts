import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todoAPI} from "../../api/todoAPI.ts";
import {iTask, iTodo} from "./types.ts";
import ErrorWithCode from "../../app/ErrorWithCode.ts";

interface iTodoState {
    todos: {
        data: {[key: number]: iTodo},
        nextId: number,
        updated: number[], //Updated todos id in app
        deleted: number[], //Deleted task id in app
    }
    tasks: {
        data: {[key: number]: iTask},
        nextId: number,
        updated: number[], //Updated tasks id in app
        deleted: number[], //Deleted task id in app
    },
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: null
}

export const loadData = createAsyncThunk(
    'todo/loadData',
    async (_, {rejectWithValue}) => {
        const response = await todoAPI.getData();
        if (!response.error) rejectWithValue(response.error);
        return Promise.resolve(response.data);
    }
)

const initialState: iTodoState = {
    todos: {
        data: [],
        nextId: 0,
        updated: [],
        deleted: [],
    },
    tasks: {
        data: [],
        nextId: 0,
        updated: [],
        deleted: [],
    },
    loading: 'idle',
    error: null,
} satisfies iTodoState as iTodoState

export const enum todoSliceErrors {
    NO_SUCH_TASK,
    NO_SUCH_TODO,
}

// todo что-то подумать с этими payload, они как бы надо, но нет

interface taskIdPayload {
    taskId: number,
}

interface taskIdTextPayload extends taskIdPayload {
    text: string,
}

interface todoIdPayload {
    todoId: number,
}

interface todoIdTextPayload extends todoIdPayload {
    text: string,
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        // todo - не давать оставить todo без task, иначе удалять автоматически, но не знаю такую функциональность можно
        //  реализовать и в самих компонентах, хотя мб это не совсем правильно, но и тут как бы нельзя
        toggleTodoEditMode: (state, action: PayloadAction<todoIdPayload>) => {
            const todo = state.todos.data[action.payload.todoId];
            if (!todo) throw new ErrorWithCode<todoSliceErrors>(`No such todo with id: '${action.payload.todoId}'`, todoSliceErrors.NO_SUCH_TODO);

            todo.editMode = !todo.editMode;
        },
        updateTodoTitleText: (state, action: PayloadAction<todoIdTextPayload>) =>{
            const todo = state.todos.data[action.payload.todoId];
            if (!todo) throw new ErrorWithCode<todoSliceErrors>(`No such todo with id: '${action.payload.todoId}'`, todoSliceErrors.NO_SUCH_TODO);

            todo.title = action.payload.text;
        },
        toggleTaskStatus: (state, action: PayloadAction<taskIdPayload>) => {
            const task = state.tasks.data[action.payload.taskId];
            if (!task) throw new ErrorWithCode<todoSliceErrors>(`No such task with id: '${action.payload.taskId}'`, todoSliceErrors.NO_SUCH_TASK);

            task.completed = !task.completed;
        },
        // todo - не давать оставлять пустым, по аналогии с todo
        updateTaskText: (state, action: PayloadAction<taskIdTextPayload>) => {
            const task = state.tasks.data[action.payload.taskId];
            if (!task) throw new ErrorWithCode<todoSliceErrors>(`No such task with id: '${action.payload.taskId}'`, todoSliceErrors.NO_SUCH_TASK);

            task.text = action.payload.text;
        },
        addTodo: (state) => {
            const todoId = state.todos.nextId;
            state.todos.updated.push(todoId);
            state.todos.data[state.todos.nextId++] = {id:todoId, idInDb: null, editMode: true, tasks: [], title: ''};
        },
        removeTodo: (state, action: PayloadAction<todoIdPayload>) => {
            const todo = state.todos.data[action.payload.todoId];
            if (!todo) throw new ErrorWithCode<todoSliceErrors>(`No such todo with id: '${action.payload.todoId}'`, todoSliceErrors.NO_SUCH_TODO);

            state.todos.deleted.push(action.payload.todoId);
            state.tasks.deleted.push(...state.todos.data[action.payload.todoId].tasks);
        },
        addTask: (state, action: PayloadAction<todoIdPayload>) => {
            const todo = state.todos.data[action.payload.todoId];
            if (!todo) throw new ErrorWithCode<todoSliceErrors>(`No such todo with id: '${action.payload.todoId}'`, todoSliceErrors.NO_SUCH_TODO);

            state.todos.data[action.payload.todoId].tasks.push(state.tasks.nextId);
            state.tasks.updated.push(state.tasks.nextId);
            const taskId = state.tasks.nextId;
            state.tasks.data[state.tasks.nextId++] = {id:taskId, idInDb: null, text: '', completed: false, todoId: action.payload.todoId};
        },
        removeTask: (state, action: PayloadAction<taskIdPayload>) => {
            const task = state.tasks.data[action.payload.taskId];
            if (!task) throw new ErrorWithCode<todoSliceErrors>(`No such task with id: '${action.payload.taskId}'`, todoSliceErrors.NO_SUCH_TASK);

            state.todos.data[task.todoId].tasks = state.todos.data[task.todoId].tasks.filter((taskId) => taskId != action.payload.taskId);
            state.tasks.deleted.push(action.payload.taskId);
        }
    },
    extraReducers: builder => {
        builder.addCase(loadData.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(loadData.rejected, (state, action) => {
            state.loading = 'failed';

            if (action.payload) {
                state.error = null;
                return
            }

            console.error(action.error);
        });
        builder.addCase(loadData.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.error = null;

            const {tasks, todos} = action.payload;

            state.tasks.nextId = tasks.nextId;
            state.tasks.data = tasks.data.reduce((acc, task) =>{
                acc[task.id] = {...task, idInDb:task.id};
                return acc;
            }, {} as { [key: number]: iTask });

            state.todos.nextId = todos.nextId;
            state.todos.data = todos.data.reduce((acc, todo) =>{
                acc[todo.id] = {...todo, idInDb:todo.id, editMode: false, tasks: todo.tasks.map(task => task.id)};
                return acc;
            }, {} as { [key: number]: iTodo });
        });
    }
})
export const {
    toggleTodoEditMode,
    toggleTaskStatus,
    updateTaskText,
    addTodo,
    updateTodoTitleText,
    removeTodo,
    addTask,
    removeTask,
} = todoSlice.actions
export default todoSlice.reducer;