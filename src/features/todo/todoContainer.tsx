import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {useEffect} from "react";
import {
    toggleTodoEditMode,
    toggleTaskStatus, updateTaskText, loadData, addTodo, addTask
} from "./todoSlice.ts";
import TodoList from "./todoList.tsx";


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

    return <TodoList
        todos={todos.data}
        tasks={tasks.data}
        onToggleEditMode={handleEditModeToggle}
        onToggleTaskStatus={handleTaskStatusToggle}
        onUpdateTaskText={handleTaskTextUpdate}
        onAddTodo={handleAddTodo}
        onAddTask={handleAddTask}
    />
}

export default TodoContainer;