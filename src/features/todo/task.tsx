import {iTask} from "./types.ts";
import {ChangeEvent} from "react";
import {iTaskHandlers} from "./todoContainer.tsx";
//  Todo - оформить



interface iTaskProps{
    task: iTask,
    taskHandlers:iTaskHandlers,
    editMode: boolean,
}

const Task = ({ task, taskHandlers, editMode}: iTaskProps) => {

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        taskHandlers.handleTaskTextUpdate(task.id, e.target.value);
    }

    return <div className="task">
        <input className={'task__text'} value={task.text} onChange={handleTextChange} readOnly={!editMode}></input>
        <input className={'task__checkBox'} type={'checkbox'} onChange={() => taskHandlers.handleTaskStatusToggle(task.id)} checked={task.completed}/>
        <button className={'task__delete-button'} onClick={()=> taskHandlers.handleRemoveTask(task.id)} hidden={!editMode}>
            <span className={'img-bin'}></span>
        </button>
    </div>
}

export default Task;
