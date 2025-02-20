import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {useEffect} from "react";
import './todo.scss';
import TodoList from "../../components/todo/todoList.tsx";
import {selectTodoIds} from "../../features/todo/todoSlice.ts";

// todo - оформить всё todo приложение, просто как-нибудь минималистично добавить различные иконки

const TodoContainer = () => {

    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth.auth);
    const todoIds = useAppSelector(selectTodoIds);

    useEffect(() => {
        dispatch(loadData());
    }, [dispatch, auth])

    return <TodoList todoIds={todoIds} />
}

export default TodoContainer;