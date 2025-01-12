import {iTask} from "./types.ts";

interface iTaskProps extends iTask{
    onTaskStateChange: (taskId: number, taskStatus: boolean) => void,
}

const Task = ({ id, text, completed, onTaskStateChange }: iTaskProps) => {
    return <div className="check-box">
        <label> {text} </label>
        <input type={"checkbox"} onChange={() => onTaskStateChange (id, completed)} checked={completed}/>
    </div>
}

export default Task;
