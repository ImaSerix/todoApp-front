import {iTask, selectTaskById} from "../../features/task/taskSlice.ts";
import {useEffect, useState} from "react";
import {useAppSelector} from "../../hooks.ts";
import {iTaskHandlers} from "./taskList.tsx";

//  Todo - оформить

interface iTaskProps {
    taskId: string,
    taskHandlers: iTaskHandlers,
    editMode: boolean,
}

//Todo  - возможно запретить в editMode менять статус задания
//      - нужна проверка заполненности, не знаю, где её реализовать тут или в Slicer, но нельзя разрешать оставлять пустым

const Task = ({taskId, taskHandlers, editMode}: iTaskProps) => {

    const task: iTask = useAppSelector((state) => selectTaskById(state, taskId));
    const [content, setContent] = useState(task.content);

    useEffect(() => {
        if (!editMode && task.content !== content) {
            taskHandlers.handleContentChange(content);
        }
    }, [content, editMode, task, taskHandlers]);

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }

    //Todo надо что-то сделать со структурой HTML, так как тут теги делают то (по названию), что не должны

    return <div className="task">
        <input className={'task__text'} value={task.content} onChange={handleContentChange}
               readOnly={!editMode}></input>
        <input className={'task__checkBox'} type={'checkbox'}
               onChange={() => taskHandlers.handleTaskStatusToggle()} checked={task.completed}/>
        <button className={'task__delete-button'} onClick={() => taskHandlers.handleRemoveTask()}
                hidden={!editMode}>
            <span className={'img-bin'}></span>
        </button>
    </div>
}

export default Task;
