import {useAppDispatch, useAppSelector} from "../../../hooks.ts";
import {useEffect} from "react";
import '../todo.scss';
import TodoList from "./todoList.tsx";
import {selectTodoIds, selectTodoLoading} from "../redux/todoSlice.ts";
import {selectUser} from "../../authentication/redux/authSlice.ts";
import loadData from "../../../app/redux/loadData.ts";

const TodoContainer = () => {

    const dispatch = useAppDispatch();

    const user = useAppSelector(selectUser);
    const todoIds = useAppSelector(selectTodoIds);

    const todoLoading = useAppSelector(selectTodoLoading);

    useEffect(() => {
        if (user && (todoLoading === 'idle')) {
            dispatch(loadData())
        }
    }, [dispatch, user, todoLoading])

    return <TodoList todoIds={todoIds}/>
}

export default TodoContainer;