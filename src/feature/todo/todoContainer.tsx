import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import Todo, {iTodo} from "./todo.tsx";
import {changeCheckBoxState} from "./todoSlice.ts";


const TodoContainer = () => {

    const dispatch = useAppDispatch();
    const todos = useAppSelector(state => state.todo.todos);

    return <div>
        {todos.map((todo: iTodo) => (
            <Todo id={todo.id} title={todo.title} completed={todo.completed} tasks={todo.tasks}
                  onTaskStateChange={(todoId, taskId, taskStatus) => dispatch(changeCheckBoxState({
                      todoId,
                      taskId,
                      taskStatus
                  }))}/>
        ))}
    </div>
}

export default TodoContainer;