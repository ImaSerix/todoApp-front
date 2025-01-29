import Task from "./task.tsx";
import {iTask, iTodo} from "./types.ts";
import {ChangeEvent, useEffect, useState} from "react";
import {iTaskHandlers, iTodoHandlers} from "./todoContainer.tsx";

// Todo - оформить, выделять edit-mode


interface iTodoProps {
    todo: iTodo,
    tasks: iTask[],
    todoHandlers:Omit <iTodoHandlers, 'handleAddTodo'>,
    taskHandlers:iTaskHandlers,
}

const Todo = ({ todo, tasks, todoHandlers, taskHandlers }: iTodoProps) => {

    const [completed, setCompleted] = useState(true);

    useEffect(()=>{
        let isTodoCompleted = true;
        for (const task of tasks){
            if (!task.completed) {
                isTodoCompleted = false
                break;
            }
        }
        setCompleted (isTodoCompleted);
    },[tasks]);

    const handleTitleTextChange = (e:ChangeEvent<HTMLInputElement>) =>{
        todoHandlers.handleTodoTitleTextUpdate(todo.id, e.target.value);
    }

    return <div className={`todo ${completed ? "completed" : ""} ${todo.editMode ? "edit-mode" : ""} `.trim()}>
        <input onChange={handleTitleTextChange} value={todo.title} readOnly={!todo.editMode}/>
        <div className="tasks">
            {tasks.map((task: iTask) =>
                (<Task task = {task}
                       key={task.id}
                       editMode={todo.editMode}
                       taskHandlers={taskHandlers}/>
                ))}
            {todo.editMode?<button className={'tasks__button-add'} onClick={() => taskHandlers.handleAddTask(todo.id)} >+</button>: ''}
        </div>
        <button onClick={()=>todoHandlers.handleEditModeToggle(todo.id)}>{todo.editMode? 'Save':'Edit'}</button>
        <button onClick={()=>todoHandlers.handleRemoveTodo(todo.id)}>Delete</button>
    </div>
}

export default Todo;