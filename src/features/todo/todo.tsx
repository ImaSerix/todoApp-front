import Task from "./task.tsx";
import {iTask, iTodo} from "./types.ts";
import {useEffect, useState} from "react";
import {iTaskHandlers, iTodoHandlers} from "./todoContainer.tsx";

// Todo - добавить возможность редактировать title
//      - оформить, выделять edit-mode
//      - добавить возможность удалять


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

    return <div className={`todo ${completed ? "completed" : ""} ${todo.editMode ? "edit-mode" : ""} `.trim()}>
        <h3>{todo.title}</h3>
        <div className="tasks">
            {tasks.map((task: iTask) =>
                (<Task task = {task}
                       key={task.id}
                       editMode={todo.editMode}
                       taskHandlers={taskHandlers}/>
                ))}
            {todo.editMode?<button className={'tasks__button-add'} onClick={() => taskHandlers.handleAddTask(todo.id)} >+</button>: ''}
        </div>
        <button onClick={()=>todoHandlers.handleEditModeToggle(todo.id)}>Edit</button>
    </div>
}

export default Todo;