import {iTask, iTodo} from "./types.ts";
import Todo from "./todo.tsx";

// import  {FC} from "react";

interface iTodoListProps {
    todos: { [p: number]: iTodo },
    tasks: { [p: number]: iTask },
    onToggleEditMode: (todoId: number) => void,
    onToggleTaskStatus: (todoId: number) => void,
    onUpdateTaskText: (taskId: number, text: string) => void,
    onAddTodo: () => void,
    onAddTask: (todoId: number) => void,
}

const TodoList = ({
                      todos,
                      tasks,
                      onToggleTaskStatus,
                      onUpdateTaskText,
                      onToggleEditMode,
                      onAddTodo,
                      onAddTask,
                  }: iTodoListProps) => {

    return <div className={'todo-container'}>
        <div className={'todo-list'}>
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
                                 onAddTask={onAddTask}/>
                })
            }
        </div>
        <button className={'button-add'} onClick={onAddTodo}>{'Add new Todo'}</button>
    </div>
}
export default TodoList;