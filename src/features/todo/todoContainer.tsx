import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {useEffect} from "react";
import {
    toggleTodoEditMode,
    toggleTaskStatus, updateTaskText, loadData, addTodo, addTask, removeTask
} from "./todoSlice.ts";
import './todo.css';
import TodoList from "./todoList.tsx";

// todo - оформить всё todo приложение, просто как-нибудь минималистично допавить различные иконки


const TodoContainer = () => {

    const dispatch = useAppDispatch();
    const todos = useAppSelector(state => state.todo.todos);
    const tasks = useAppSelector(state => state.todo.tasks);

    useEffect(() => {
        dispatch(loadData());
    },[dispatch])

    const handleEditModeToggle = (todoId: number) => {
        dispatch(toggleTodoEditMode({id: todoId}));
    }

    const handleTaskStatusToggle = (taskId: number) => {
        dispatch(toggleTaskStatus({id: taskId}));
    }

    const handleTaskTextUpdate = (taskId: number, text: string) => {
        dispatch(updateTaskText({id: taskId, text}));
    }

    const handleAddTodo = () => {
        dispatch(addTodo());
    }

    const handleAddTask = (todoId: number) => {
        dispatch(addTask({todoId}));
    }

    const handleRemoveTask = (taskId:number)=>{
        dispatch(removeTask({id: taskId}));
    }

    return <TodoList
        todos={todos.data}
        tasks={tasks.data}
        onToggleEditMode={handleEditModeToggle}
        onToggleTaskStatus={handleTaskStatusToggle}
        onUpdateTaskText={handleTaskTextUpdate}
        onAddTodo={handleAddTodo}
        onAddTask={handleAddTask}
        onRemoveTask={handleRemoveTask}
    />
}

export default TodoContainer;