import {iTask} from "./types.ts";
import {ChangeEvent} from "react";
import {iTaskHandlers} from "./todoContainer.tsx";
// Todo - оформить



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
        <input type={'task__text'} value={task.text} onChange={handleTextChange} readOnly={!editMode}></input>
        <input className={'task__checkBox'} type={'checkbox'} onChange={() => taskHandlers.handleTaskStatusToggle(task.id)} checked={task.completed}/>
        <button className={'task__button-remove'} onClick={()=> taskHandlers.handleRemoveTask(task.id)} hidden={!editMode}>X</button>
    </div>
}

export default Task;
