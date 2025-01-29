import {iTask, iTodo} from "./types.ts";
import Todo from "./todo.tsx";
import {iTaskHandlers, iTodoHandlers} from "./todoContainer.tsx";

// import  {FC} from "react";

// todo теоретически можно попробовать наследовать Props, или всё таки как-то объединить пропсы в одни объекты, по типу todoProps,
//  todoTaskProps - дабы было легче опракидывать props, да и таким образом уменьшится повторение

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

    return <div className={'Todo-container'}>
        <div className={'Todo-list'}>
            {
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