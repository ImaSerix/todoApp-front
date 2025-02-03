import {iTask, iTodo} from "./types.ts";
import Todo from "./todo.tsx";
import {iTaskHandlers, iTodoHandlers} from "./todoContainer.tsx";

// todo Если todo список пустой, то тоже надо что-то написать
interface iTodoListProps {
    todos: { [p: number]: iTodo },
    tasks: { [p: number]: iTask },
    todoHandlers: iTodoHandlers,
    taskHandlers: iTaskHandlers,
}

const TodoList = ({
                      todos,
                      tasks,
                      todoHandlers,
                      taskHandlers
                  }: iTodoListProps) => {

    if (Object.keys(todos).length == 0) {
    }

    return <div className={'Todo-container'}>
        <div className={'Todo-list'}>
            {
                Object.keys(todos).length == 0? <div>{'Todo list is empty'}</div>:
                Object.keys(todos).map((taskId) => {
                    const numericTaskId = Number(taskId);
                    const todo = todos[numericTaskId];
                    return <Todo
                        todo={todo}
                        key={numericTaskId}
                        tasks={todo.tasks.map(taskId => tasks[taskId])}
                        todoHandlers={todoHandlers}
                        taskHandlers={taskHandlers}/>
                })
            }
        </div>
        <button className={'Todo-container__button-add'} onClick={todoHandlers.handleAddTodo}>{'Add new Todo'}</button>
    </div>
}
export default TodoList;