import {CSSProperties, useCallback, useEffect, useState} from "react";
import {iTodoHandlers} from "./todoList.tsx";
import ColorPicker from "../../color/components/ColorPicker.tsx";
import {useAppSelector} from "../../../hooks.ts";
import {selectTodoById} from "../redux/todoSlice.ts";
import {selectAreAllTasksOfTodoIdCompleted} from "../../task/redux/taskSlice.ts";
import {selectColorById} from "../../color/redux/colorSlice.ts";
import TaskList from "../../task/components/taskList.tsx";

interface iTodoProps {
    todoId: string,
    todoHandlers: iTodoHandlers,
}

const TodoCard = ({todoId, todoHandlers}: iTodoProps) => {

    const todo = useAppSelector((state) => selectTodoById(state, todoId));
    const completed = useAppSelector(state => selectAreAllTasksOfTodoIdCompleted(state, todoId))
    const color = useAppSelector(state => selectColorById(state, todo.colorId));
    const [isEditable, setIsEditable] = useState(false);
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [title, setTitle] = useState(todo.title);

    const handleTitleTextChange = useCallback((e: React.FormEvent<HTMLHeadingElement>) => {
        setTitle(e.currentTarget.textContent || '');
    }, [])

    useEffect(() => {
        if (!isEditable && todo.title !== title) {
            todoHandlers.handleTodoTitleTextUpdate(title);
        }
    }, [isEditable, title, todo.title, todoHandlers]);


    // Render controls for editing tоdo-card
    const renderEditableControls = () => (
        <>
            <button className={'todo__button-delete'} onClick={todoHandlers.handleRemoveTodo}>
                <span className={`img-bin`}/>
            </button>
            <button className={'todo__button-color-picker'}
                    onMouseDown={(event) => {
                        event.stopPropagation();
                        setIsColorPickerOpen(!isColorPickerOpen);
                    }}>
                <span className={`img-color-picker`}/>
            </button>
            <ColorPicker
                colorPicked={color => todoHandlers.handleTodoColorUpdate(color)}
                colorPickerVisible={isColorPickerOpen}
                setColorPickerVisible={setIsColorPickerOpen}
            />
        </>
    );

    return <div style={{
        '--todo-color-red': color.red,
        '--todo-color-green': color.green,
        '--todo-color-blue': color.blue,
        '--todo-color-opacity': color.opacity
    } as CSSProperties}
                className={`todo ${completed ? "todo--completed " : "todo--uncompleted"} 
                            ${isEditable ? "todo--isEditable" : "todo--isNotEditable"}`}>

        <h2 className={'todo__title'}
            onInput={handleTitleTextChange}
            contentEditable={isEditable}
            suppressContentEditableWarning={true}>{todo.title}</h2>

        <TaskList todoId={todo.id} isEditable={isEditable}/>

        {/*Button to toggle Editable*/}
        <button className={`todo__button-edit`} onClick={() => setIsEditable(!isEditable)}>
            <span className={`${isEditable ? 'img-discrete' : 'img-pen'}`}/>
        </button>

        {/*Content available only when tоdo-card is editable*/}
        {isEditable && renderEditableControls()}
    </div>
}

export default TodoCard;