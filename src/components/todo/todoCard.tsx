import {ChangeEvent, CSSProperties, useState} from "react";
import {iTodoHandlers} from "./todoList.tsx";
import ColorPicker from "../color/ColorPicker.tsx";
import {useAppSelector} from "../../hooks.ts";
import {selectTodoById} from "../../features/todo/todoSlice.ts";
import {selectAreAllTasksCompleted} from "../../features/task/taskSlice.ts";
import {selectColorById} from "../../features/color/colorSlice.ts";
import TaskList from "../task/taskList.tsx";

// Todo - оформить, выделять edit-mode

interface iTodoProps {
    todoId: string,
    todoHandlers: iTodoHandlers,
}

const TodoCard = ({todoId, todoHandlers}: iTodoProps) => {

    const todo = useAppSelector((state) => selectTodoById(state, todoId));
    const completed = useAppSelector(state => selectAreAllTasksCompleted(state, todo.tasks))
    const color = useAppSelector(state => selectColorById(state, todo.colorId));
    const [editMode, setEditMode] = useState(false);
    const [colorPickerVisible, setColorPickerVisible] = useState(false);

    const handleTitleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        todoHandlers.handleTodoTitleTextUpdate(e.target.value);
    }

    return <div style={{
        '--todo-color-red': color.red,
        '--todo-color-green': color.green,
        '--todo-color-blue': color.blue,
        '--todo-color-opacity': color.opacity,
    } as CSSProperties}
                className={`todo ${completed ? "todo--completed " : ""}${editMode ? "todo--edit-mode" : ""} `.trim()}>
        {/*Todo переделать это в заголовок, или как-то решить проблему, что если title слишком большой - не влезает в карточку */}
        <input className={'todo__title'} onChange={handleTitleTextChange} value={todo.title} readOnly={!editMode}/>

        <TaskList todoId = {todo.id} editMode={editMode} taskIds={todo.tasks}/>

        {editMode &&
            <>
                <button className={'todo__button-color-picker'}
                        onClick={() => setColorPickerVisible(!colorPickerVisible)}>
                    <span className={`img-color-picker`}/>
                </button>
            </>}

        {colorPickerVisible &&
            <ColorPicker colorPicked={(color) => todoHandlers.handleTodoColorUpdate(color)}/>}

        <>
            <button className={`todo__button-edit`} onClick={() => setEditMode(!editMode)}>
                <span className={`${editMode ? 'img-discrete' : 'img-pen'}`}/>
            </button>
            <button className={'todo__button-delete'} onClick={() => todoHandlers.handleRemoveTodo()}>
                <span className={`img-bin`}/>
            </button>
        </>

    </div>
}

export default TodoCard;