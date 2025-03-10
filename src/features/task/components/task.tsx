import {iTask, selectTaskById} from "../redux/taskSlice.ts";
import {useAppSelector} from "../../../hooks.ts";
import {iTaskHandlers} from "./taskList.tsx";
import {useCallback, useEffect, useState} from "react";


interface iTaskProps {
    taskId: string,
    taskHandlers: iTaskHandlers,
    isEditable: boolean,
}

const Task = ({taskId, taskHandlers, isEditable}: iTaskProps) => {

    const task: iTask = useAppSelector((state) => selectTaskById(state, taskId));
    const [content, setContent] = useState(task.content);

    const handleContentChange = useCallback((e: React.FormEvent<HTMLParagraphElement>) => {
        setContent(e.currentTarget.textContent || '');
    }, [])

    useEffect(() => {
        if (!isEditable && task.content !== content) taskHandlers.handleContentChange(content);
    }, [content, isEditable, task.content, taskHandlers]);


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
