import Task from "./task.tsx";
import {iTask, iTodo} from "./types.ts";
import {useEffect, useState} from "react";

// Todo - добавить совзможность редактировать title
//      - оформить, выделять edit-mode
//      - добавить возможность удалять


interface iTodoProps extends Omit<iTodo, 'tasks' | 'idInDb'> {
    tasks: iTask[],
    onToggleEditMode: (todoId:number) => void,
    onToggleTaskStatus: (taskId:number) => void,
    onUpdateTaskText: (taskId:number, text: string) => void,
    onAddTask: (todoId: number) => void,
}

const Todo = ({ id, title, tasks, editMode, onToggleEditMode, onToggleTaskStatus, onUpdateTaskText, onAddTask}: iTodoProps) => {

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

    return <div className={`todo ${completed ? "completed" : ""} ${editMode ? "edit-mode" : ""} `.trim()}>
        <h3>{title}</h3>
        <div className="tasks">
            {tasks.map((task: iTask) =>
                (<Task id={task.id}
                       text={task.text}
                       completed={task.completed}
                       key={task.id}
                       editMode={editMode}
                       onToggleTaskStatus={(taskId: number) => onToggleTaskStatus(taskId)}
                       onUpdateTaskText={(taskId: number, text: string) => onUpdateTaskText(taskId, text)}/>
                ))}
            {editMode?<button className={'tasks__button-add'} onClick={() => onAddTask(id)} >+</button>: ''}
        </div>
        <button onClick={()=>onToggleEditMode(id)}>Edit</button>
    </div>
}

export default Todo;