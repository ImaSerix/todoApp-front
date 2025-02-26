import {useAppDispatch, useAppSelector} from "../../../hooks.ts";
import {useEffect} from "react";
import '../todo.scss';
import TodoList from "./todoList.tsx";
import {selectTodoIds, selectTodoLoading} from "../redux/todoSlice.ts";
import {selectUser} from "../../authentication/authSlice.ts";
import loadData from "../../../app/redux/loadData.ts";

// todo - оформить всё todo приложение, просто как-нибудь минималистично добавить различные иконки

const TodoContainer = () => {

    const dispatch = useAppDispatch();
    // todo Вероятно нужно auth переместить выше по дереву компонентов
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