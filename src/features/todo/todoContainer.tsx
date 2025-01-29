import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {useEffect} from "react";
import {
    toggleTodoEditMode,
    toggleTaskStatus, updateTaskText, loadData, addTodo, addTask, removeTask, updateTodoTitleText
} from "./todoSlice.ts";
import './todo.css';
import TodoList from "./todoList.tsx";

// todo - оформить всё todo приложение, просто как-нибудь минималистично допавить различные иконки

export interface iTodoHandlers {
    handleEditModeToggle: (todoId:number) => void,
    handleAddTodo: () => void,
    handleTodoTitleTextUpdate: (todoId:number, text:string) => void,
}

export interface iTaskHandlers {
    handleAddTask: (todoId: number) => void,
    handleRemoveTask: (taskId: number) => void,
    handleTaskStatusToggle: (taskId:number) => void,
    handleTaskTextUpdate: (taskId: number, text: string) => void,
}

const TodoContainer = () => {

    const dispatch = useAppDispatch();
    const todos = useAppSelector(state => state.todo.todos);
    const tasks = useAppSelector(state => state.todo.tasks);

    useEffect(() => {
        dispatch(loadData());
    },[dispatch])

    const todoHandlers:iTodoHandlers = {
        handleAddTodo: () => {dispatch(addTodo())},
        handleEditModeToggle: (todoId:number) => {dispatch(toggleTodoEditMode({todoId}))},
        handleTodoTitleTextUpdate: (todoId:number, text:string) => {dispatch(updateTodoTitleText({todoId, text}))},
    }

    const taskHandlers:iTaskHandlers = {
        handleAddTask: (todoId: number) => {dispatch(addTask({todoId}))},
        handleRemoveTask: (taskId: number) => {dispatch(removeTask({taskId}))},
        handleTaskStatusToggle: (taskId: number) => {dispatch(toggleTaskStatus({taskId}))},
        handleTaskTextUpdate: (taskId: number, text: string) => {dispatch(updateTaskText({taskId, text}))},
    }

    return <TodoList
        todos={todos.data}
        tasks={tasks.data}
        todoHandlers={todoHandlers}
        taskHandlers={taskHandlers}
    />
}

export default TodoContainer;