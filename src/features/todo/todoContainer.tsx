import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {useEffect} from "react";
import {
    toggleTodoEditMode,
    toggleTaskStatus,
    updateTaskText,
    loadData,
    addTodo,
    addTask,
    removeTask,
    updateTodoTitleText,
    removeTodo,
    todoSliceErrors, updateTodoColor, toggleColorPickerVisible
} from "./todoSlice.ts";
import './todo.scss';
import TodoList from "./todoList.tsx";
import ErrorWithCode from "../../app/ErrorWithCode.ts";
import {Color} from "./types.ts";

// todo - оформить всё todo приложение, просто как-нибудь минималистично добавить различные иконки

export interface iTodoHandlers {
    handleEditModeToggle: (todoId: number) => void,
    handleAddTodo: () => void,
    handleTodoTitleTextUpdate: (todoId: number, text: string) => void,
    handleRemoveTodo: (todoId: number) => void,
    handleColorPickerVisibleToggle: (todoId: number) => void,
    handleTodoColorUpdate: (todoId: number, color: Color) => void,
}

export interface iTaskHandlers {
    handleAddTask: (todoId: number) => void,
    handleRemoveTask: (taskId: number) => void,
    handleTaskStatusToggle: (taskId: number) => void,
    handleTaskTextUpdate: (taskId: number, text: string) => void,
}

const TodoContainer = () => {

    const dispatch = useAppDispatch();
    const todos = useAppSelector(state => state.todo.todos);
    const tasks = useAppSelector(state => state.todo.tasks);
    const auth = useAppSelector(state => state.auth.auth);


    useEffect(() => {
        dispatch(loadData());
    }, [dispatch, auth])

    const todoHandlers: iTodoHandlers = {
        handleAddTodo: () => {
            dispatch(addTodo())
        },
        handleEditModeToggle: (todoId: number) => {
            // todo обработка есть, но нужно также какое-нибудь сообщение, чтоб было понятно
            try {
                dispatch(toggleTodoEditMode({todoId}))
            } catch (e) {
                if (e as ErrorWithCode<todoSliceErrors>) {
                    alert((e as ErrorWithCode<todoSliceErrors>).message);
                    console.log((e as ErrorWithCode<todoSliceErrors>).message);
                }
                else console.error(e);
            }
        },
        handleTodoTitleTextUpdate: (todoId: number, text: string) => {
            dispatch(updateTodoTitleText({todoId, text}))
        },
        handleRemoveTodo: (todoId: number) => {
            dispatch(removeTodo({todoId}))
        },
        handleColorPickerVisibleToggle: (todoId: number) => {
            dispatch(toggleColorPickerVisible({todoId}))
        },
        handleTodoColorUpdate: (todoId: number, color: Color) => {
            dispatch(updateTodoColor({todoId, color}))
        }
    }

    const taskHandlers: iTaskHandlers = {
        handleAddTask: (todoId: number) => {
            dispatch(addTask({todoId}))
        },
        handleRemoveTask: (taskId: number) => {
            dispatch(removeTask({taskId}))
        },
        handleTaskStatusToggle: (taskId: number) => {
            dispatch(toggleTaskStatus({taskId}))
        },
        handleTaskTextUpdate: (taskId: number, text: string) => {
            dispatch(updateTaskText({taskId, text}))
        },
    }

    return <TodoList
        todos={todos.data}
        tasks={tasks.data}
        todoHandlers={todoHandlers}
        taskHandlers={taskHandlers}
    />
}

export default TodoContainer;