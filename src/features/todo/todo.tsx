import Task from "./task.tsx";
import {iTask, iTodo} from "./types.ts";
import {ChangeEvent, useEffect, useState} from "react";
import {iTaskHandlers, iTodoHandlers} from "./todoContainer.tsx";

// Todo - оформить, выделять edit-mode


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

    const handleTitleTextChange = (e:ChangeEvent<HTMLInputElement>) =>{
        todoHandlers.handleTodoTitleTextUpdate(todo.id, e.target.value);
    }

    //Todo Посмотреть норм ли решение пихать такое в style
    return <div style={{backgroundColor: todo.color}} className={`Todo ${completed ? "Completed" : ""} ${todo.editMode ? "edit-mode" : ""} `.trim()}>
        <input className={'Todo__title'} onChange={handleTitleTextChange} value={todo.title} readOnly={!todo.editMode}/>
        <div className="Todo__tasks">
            {tasks.map((task: iTask) =>
                (<Task task = {task}
                       key={task.id}
                       editMode={todo.editMode}
                       taskHandlers={taskHandlers}/>
                ))}
            {todo.editMode?<button className={'tasks__button-add'} onClick={() => taskHandlers.handleAddTask(todo.id)} >+</button>: ''}
        </div>
        <button className={`Todo__button-edit`} onClick={()=>todoHandlers.handleEditModeToggle(todo.id)}>
            <span className={`${todo.editMode? 'discrete':'pen'}`} />
        </button>
        <button className={'Todo__button-delete'} onClick={() => todoHandlers.handleRemoveTodo(todo.id)}>
            <span className={`bin`}/>
        </button>
    </div>
}

export default Todo;