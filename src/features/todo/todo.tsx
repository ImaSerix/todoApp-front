import Task from "./task.tsx";
import {iTask, iTodo} from "./types.ts";
import {ChangeEvent, CSSProperties, useEffect, useState} from "react";
import {iTaskHandlers, iTodoHandlers} from "./todoContainer.tsx";
import ColorPicker from "./ColorPicker.tsx";
import {useAppSelector} from "../../hooks.ts";

// Todo - оформить, выделять edit-mode


interface iTodoProps {
    todo: iTodo,
    tasks: iTask[],
    todoHandlers: Omit<iTodoHandlers, 'handleAddTodo'>,
    taskHandlers: iTaskHandlers,
}

const Todo = ({todo, tasks, todoHandlers, taskHandlers}: iTodoProps) => {

    const [completed, setCompleted] = useState(true);

    useEffect(() => {
        let isTodoCompleted = true;
        for (const task of tasks) {
            if (!task.completed) {
                isTodoCompleted = false
                break;
            }
        }
        setCompleted(isTodoCompleted);
    }, [tasks]);

    const color = useAppSelector(state => state.todo.colors.data[todo.color])

    const handleTitleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        todoHandlers.handleTodoTitleTextUpdate(todo.id, e.target.value);
    }

    return <div style={{
        '--todo-color-red': color.red,
        '--todo-color-green': color.green,
        '--todo-color-blue': color.blue,
        '--todo-color-opacity': color.opacity,
    } as CSSProperties}
                className={`todo ${completed ? "todo--completed " : ""}${todo.editMode ? "todo--edit-mode" : ""} `.trim()}>
        {/*Todo переделать это в заголовок, или как-то решить проблему, что если title слишком большой - не влезает в карточку */}
        <input className={'todo__title'} onChange={handleTitleTextChange} value={todo.title} readOnly={!todo.editMode}/>

        <div className="todo__task-list">
            {tasks.map((task: iTask) =>
                (<Task task={task}
                       key={task.id}
                       editMode={todo.editMode}
                       taskHandlers={taskHandlers}/>
                ))}
        </div>

        {todo.editMode &&
            <>
                <button className={'todo__button-add'} onClick={() => taskHandlers.handleAddTask(todo.id)}>+
                </button>
                <button className={'todo__button-color-picker'}
                        onClick={() => todoHandlers.handleColorPickerVisibleToggle(todo.id)}>
                    <span className={`img-color-picker`}/>
                </button>
            </>}

        {todo.colorPickerVisible &&
            <ColorPicker colorPicked={(color) => todoHandlers.handleTodoColorUpdate(todo.id, color)}/>}

        <>
            <button className={`todo__button-edit`} onClick={() => todoHandlers.handleEditModeToggle(todo.id)}>
                <span className={`${todo.editMode ? 'img-discrete' : 'img-pen'}`}/>
            </button>
            <button className={'todo__button-delete'} onClick={() => todoHandlers.handleRemoveTodo(todo.id)}>
                <span className={`img-bin`}/>
            </button>
        </>
    </div>
}

export default Todo;