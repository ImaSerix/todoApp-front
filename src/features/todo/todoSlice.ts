import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todoAPI} from "../../api/todoAPI.ts";
import {Color, iTask, iTodo} from "./types.ts";
import ErrorWithCode from "../../app/ErrorWithCode.ts";

// todo Проблемы с цветами, возможно также отдаёт не верный todo
interface iTodoState {
    todos: {
        data: { [key: number]: iTodo },
        nextId: number,
        updated: number[], //Updated todos id in app
        deleted: number[], //Deleted task id in app
    }
    tasks: {
        data: { [key: number]: iTask },
        nextId: number,
        updated: number[], //Updated tasks id in app
        deleted: number[], //Deleted task id in app
    },
    colors: {
        data: { [key: number]: Color },
    }
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: string | null,
}

export const loadData = createAsyncThunk(
    'todo/loadData',
    async (_, {rejectWithValue}) => {
        try {
            const response = await todoAPI.getData();
            console.log(response);
            return response
        } catch (error) {
            rejectWithValue(error)
            return Promise.reject(error);
        }
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
    colors: {
        data: [],
    },
    loading: 'idle',
    error: null,
}

export const enum todoSliceErrors {
    NO_SUCH_TASK,
    NO_SUCH_TODO,
    TODO_IS_EMPTY,
    TODO_TITLE_IS_EMPTY,
    TASK_TEXT_IS_EMPTY,
}

interface taskIdPayload {
    taskId: number,
}

interface taskIdTextPayload extends taskIdPayload {
    text: string,
}

interface todoIdPayload {
    todoId: number,
}

interface todoIdColorPayload extends todoIdPayload {
    color: Color,
}

interface todoIdTextPayload extends todoIdPayload {
    text: string,
}

// Todo сделать возможность сохранять, а точнее как бы отправлять state
//  разобраться с тем, чтоб updated как-то обновлялся

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        toggleTodoEditMode: (state, action: PayloadAction<todoIdPayload>) => {
            const todo = state.todos.data[action.payload.todoId];
            if (!todo) throw new ErrorWithCode<todoSliceErrors>(`No such todo with id: '${action.payload.todoId}'`, todoSliceErrors.NO_SUCH_TODO);

            // Проверки перед отключением:
            //  - Чтоб title не был пустой
            //  - Чтоб был хоть один task
            //  - Чтоб task был с текстом

            if (todo.tasks.length == 0) throw new ErrorWithCode<todoSliceErrors>(`Todo must have at least one task!`, todoSliceErrors.TODO_IS_EMPTY);
            if (todo.title.trim() == '') throw new ErrorWithCode<todoSliceErrors>(`Title mustn't be empty!`, todoSliceErrors.TODO_TITLE_IS_EMPTY);

            for (const taskId of todo.tasks) {
                if (state.tasks.data[taskId].text.trim() == '') throw new ErrorWithCode<todoSliceErrors>(`Task text mustn't be empty!`, todoSliceErrors.TASK_TEXT_IS_EMPTY);
            }
            todo.colorPickerVisible = false;
            todo.editMode = !todo.editMode;
        },
        updateTodoTitleText: (state, action: PayloadAction<todoIdTextPayload>) => {
            const todo = state.todos.data[action.payload.todoId];
            if (!todo) throw new ErrorWithCode<todoSliceErrors>(`No such todo with id: '${action.payload.todoId}'`, todoSliceErrors.NO_SUCH_TODO);

            // Set that t`odo is updated
            if (!state.todos.updated.find(id => id === action.payload.todoId)) state.todos.updated.push(action.payload.todoId);
            todo.title = action.payload.text;
        },
        toggleTaskStatus: (state, action: PayloadAction<taskIdPayload>) => {
            const task = state.tasks.data[action.payload.taskId];
            if (!task) throw new ErrorWithCode<todoSliceErrors>(`No such task with id: '${action.payload.taskId}'`, todoSliceErrors.NO_SUCH_TASK);


            if (!state.tasks.updated.find(id => id === action.payload.taskId)) state.tasks.updated.push(action.payload.taskId);
            task.completed = !task.completed;
        },
        updateTaskText: (state, action: PayloadAction<taskIdTextPayload>) => {
            const task = state.tasks.data[action.payload.taskId];
            if (!task) throw new ErrorWithCode<todoSliceErrors>(`No such task with id: '${action.payload.taskId}'`, todoSliceErrors.NO_SUCH_TASK);

            if (!state.tasks.updated.find(id => id === action.payload.taskId)) state.tasks.updated.push(action.payload.taskId);
            task.text = action.payload.text;
        },
        addTodo: (state) => {
            state.todos.updated.push(state.todos.nextId);
            state.todos.data[state.todos.nextId] = {
                id: state.todos.nextId++,
                idInDb: null,
                editMode: true,
                colorPickerVisible: false,
                tasks: [],
                title: 'Unnamed',
                color: Math.floor(Math.random() * Object.keys(state.colors.data).length),
            };
        },
        removeTodo: (state, action: PayloadAction<todoIdPayload>) => {
            const todo = state.todos.data[action.payload.todoId];
            if (!todo) throw new ErrorWithCode<todoSliceErrors>(`No such todo with id: '${action.payload.todoId}'`, todoSliceErrors.NO_SUCH_TODO);

            state.todos.deleted.push(action.payload.todoId);
            state.tasks.deleted.push(...state.todos.data[action.payload.todoId].tasks);
            for (const task of todo.tasks) {
                delete state.tasks.data[task];
            }
            delete state.todos.data[action.payload.todoId];
        },
        toggleColorPickerVisible: (state, action: PayloadAction<todoIdPayload>) => {
            const todo = state.todos.data[action.payload.todoId];
            if (!todo) throw new ErrorWithCode<todoSliceErrors>(`No such todo with id: '${action.payload.todoId}'`, todoSliceErrors.NO_SUCH_TODO);

            todo.colorPickerVisible = !todo.colorPickerVisible;
        },
        updateTodoColor(state, action: PayloadAction<todoIdColorPayload>) {
            const todo = state.todos.data[action.payload.todoId];
            if (!todo) throw new ErrorWithCode<todoSliceErrors>(`No such todo with id: '${action.payload.todoId}'`, todoSliceErrors.NO_SUCH_TODO);

            if (!state.todos.updated.find(id => id === action.payload.todoId)) state.todos.updated.push(action.payload.todoId);
            todo.colorPickerVisible = false;
            todo.color = action.payload.color.id;
        },
        addTask: (state, action: PayloadAction<todoIdPayload>) => {
            const todo = state.todos.data[action.payload.todoId];
            if (!todo) throw new ErrorWithCode<todoSliceErrors>(`No such todo with id: '${action.payload.todoId}'`, todoSliceErrors.NO_SUCH_TODO);

            state.todos.data[action.payload.todoId].tasks.push(state.tasks.nextId);
            state.tasks.updated.push(state.tasks.nextId);
            state.tasks.data[state.tasks.nextId] = {
                id: state.tasks.nextId++,
                idInDb: null,
                text: 'Unnamed',
                completed: false,
                todoId: action.payload.todoId
            };
        },
        removeTask: (state, action: PayloadAction<taskIdPayload>) => {
            const task = state.tasks.data[action.payload.taskId];
            if (!task) throw new ErrorWithCode<todoSliceErrors>(`No such task with id: '${action.payload.taskId}'`, todoSliceErrors.NO_SUCH_TASK);

            state.todos.data[task.todoId].tasks = state.todos.data[task.todoId].tasks.filter((taskId) => taskId != action.payload.taskId);
            state.tasks.deleted.push(action.payload.taskId);
        },
    },
    extraReducers: builder => {
        builder.addCase(loadData.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(loadData.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error as string;

            state.tasks = initialState.tasks;
            state.todos = initialState.todos;
            state.colors = initialState.colors;
        });
        builder.addCase(loadData.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.error = null;

            state.todos.nextId = 0;
            state.tasks.nextId = 0;

            const {tasks, todos, colors} = action.payload;

            state.colors.data = colors.reduce<{ [key: number]: Color }>((acc, color) => {
                acc[color.id] = {...color};
                return acc;
            }, {});

            if (!tasks) state.tasks.data = initialState.tasks.data;
            else {
                state.tasks.data = tasks.reduce<{ [key: number]: iTask }>((acc, task) => {
                    acc[task.id] = {...task, idInDb: task.id, id: task.id};
                    if (state.tasks.nextId < task.id) state.tasks.nextId = 1 + task.id;
                    return acc;
                }, {});
            }
            console.log (todos);
            if (!todos) state.todos.data = initialState.todos.data;
            else {
                state.todos.data = todos.reduce<{ [key: number]: iTodo }>((acc, todo) => {
                    acc[todo.id] = {
                        ...todo,
                        color: todo.color.id,
                        id: todo.id,
                        idInDb: todo.id,
                        editMode: false,
                        colorPickerVisible: false,
                        tasks: todo.tasks.map((task) => task.id),
                    };
                    if (state.todos.nextId < todo.id) state.tasks.nextId = 1 + todo.id;
                    return acc;
                }, {});
            }
        });
    }
})
export const {
    toggleTodoEditMode,
    toggleTaskStatus,
    updateTaskText,
    addTodo,
    toggleColorPickerVisible,
    updateTodoColor,
    updateTodoTitleText,
    removeTodo,
    addTask,
    removeTask,
} = todoSlice.actions
export default todoSlice.reducer;