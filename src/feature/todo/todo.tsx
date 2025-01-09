import CheckBox, {iCheckBox} from "../../components/checkBox.tsx";

export interface iTodo {
    id: number,
    title: string,
    completed: boolean,
    tasks: iCheckBox[],
}

interface iTodoProps extends iTodo {
    onTaskStateChange: (todoId: number, taskId: number, taskStatus: boolean) => void
}

const Todo = ({id, title, completed, tasks, onTaskStateChange}: iTodoProps) => {

    return <div className={`todo ${completed ? "completed" : ""}`}>
        <h3>{title}</h3>
        <div className="tasks">
            {tasks.map((task: iCheckBox) =>
                (<CheckBox id={task.id} text={task.text} completed={task.completed}
                           onClick={(taskId: number, taskStatus: boolean) => onTaskStateChange(id, taskId, taskStatus)}/>
                ))}
        </div>
    </div>
}

export default Todo;