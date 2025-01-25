import {iTask} from "./types.ts";
import {ChangeEvent} from "react";
// Todo - оформить
//      - сделать возможность удалить task



interface iTaskProps extends Omit <iTask, 'todoId' | 'idInDb'>{
    onToggleTaskStatus: (taskId: number) => void,
    onUpdateTaskText: (taskId: number, text: string) => void,
    editMode: boolean,
}

const Task = ({ id, text, completed, onToggleTaskStatus, onUpdateTaskText, editMode }: iTaskProps) => {

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        onUpdateTaskText(id, e.target.value);
    }

    return <div className="task">
        <input type={'task__text'} value={text} onChange={handleTextChange} readOnly={!editMode}></input>
        <input className={'task__checkBox'} type={'checkbox'} onChange={() => onToggleTaskStatus (id)} checked={completed}/>
    </div>
}

export default Task;
