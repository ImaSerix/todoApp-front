import {iTask, iTodo} from "./types.ts";
import Todo from "./todo.tsx";

// import  {FC} from "react";

// todo теоретически можно попробовать наследовать Props, или всё таки как-то объединить пропсы в одни объекты, по типу todoProps,
//  todoTaskProps - дабы было легче опракидывать props, да и таким образом уменьшится повторение

interface iTodoListProps {
    todos: { [p: number]: iTodo },
    tasks: { [p: number]: iTask },
    onToggleEditMode: (todoId: number) => void,
    onToggleTaskStatus: (todoId: number) => void,
    onUpdateTaskText: (taskId: number, text: string) => void,
    onAddTodo: () => void,
    onAddTask: (todoId: number) => void,
    onRemoveTask: (taskId: number) => void,
}

const TodoList = ({
                      todos,
                      tasks,
                      onToggleTaskStatus,
                      onUpdateTaskText,
                      onToggleEditMode,
                      onAddTodo,
                      onAddTask,
                      onRemoveTask,
                  }: iTodoListProps) => {

    return <div className={'Todo-container'}>
        <div className={'Todo-list'}>
            {
                Object.keys(todos).map((taskId) => {
                    const numericTaskId = Number(taskId);
                    const todo = todos[numericTaskId];
                    return <Todo id={numericTaskId}
                                 title={todo.title}
                                 tasks={todo.tasks.map(taskId => tasks[taskId])}
                                 key={numericTaskId}
                                 editMode={todo.editMode}
                                 onToggleEditMode={onToggleEditMode}
                                 onToggleTaskStatus={onToggleTaskStatus}
                                 onUpdateTaskText={onUpdateTaskText}
                                 onAddTask={onAddTask}
                                 onRemoveTask={onRemoveTask}/>
                })
            }
        </div>
        <button className={'Todo-container__button-add'} onClick={onAddTodo}>{'Add new Todo'}</button>
    </div>
}
export default TodoList;