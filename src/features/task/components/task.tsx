import {iTask, selectTaskById} from "../redux/taskSlice.ts";
import {useAppSelector} from "../../../hooks.ts";
import {iTaskHandlers} from "./taskList.tsx";
import {useCallback, useEffect, useState} from "react";

//  Todo - оформить

interface iTaskProps {
    taskId: string,
    taskHandlers: iTaskHandlers,
    isEditable: boolean,
}

//Todo  - возможно запретить в editMode менять статус задания
//      - нужна проверка заполненности, не знаю, где её реализовать тут или в Slicer, но нельзя разрешать оставлять пустым

const Task = ({taskId, taskHandlers, isEditable}: iTaskProps) => {

    const task: iTask = useAppSelector((state) => selectTaskById(state, taskId));
    const [content, setContent] = useState(task.content);

    const handleContentChange = useCallback((e: React.FormEvent<HTMLParagraphElement>) => {
        setContent(e.currentTarget.textContent || '');
    }, [])

    useEffect(() => {
        if (!isEditable && task.content !== content) taskHandlers.handleContentChange(content);
    }, [content, isEditable, task.content, taskHandlers]);

    //Todo надо что-то сделать со структурой HTML, так как тут теги делают то (по названию), что не должны

    return <div className={'task'}>
        <p className={'task__text'} onInput={handleContentChange}
           contentEditable={isEditable}
           suppressContentEditableWarning={true}>{task.content}</p>
        <input className={'task__checkBox'} type={'checkbox'}
               onChange={() => taskHandlers.handleTaskStatusToggle()} checked={task.completed}/>
        <button className={'task__delete-button'} onClick={() => taskHandlers.handleRemoveTask()}
                hidden={!isEditable}>
            <span className={'img-bin'}></span>
        </button>
    </div>
}

export default Task;
