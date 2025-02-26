import Task from "./task.tsx";
import {useAppDispatch, useAppSelector} from "../../../hooks.ts";
import {addTask, removeTask, selectTaskIdsByTodoId, toggleTaskStatus, updateTaskContent} from "../redux/taskSlice.ts";

interface iTaskListProps {
    todoId: string,
    isEditable: boolean,
}

export interface iTaskHandlers {
    handleContentChange: (content: string) => void,
    handleTaskStatusToggle: () => void,
    handleRemoveTask: () => void,
}

const TaskList = ({todoId, isEditable}: iTaskListProps) => {

    const dispatch = useAppDispatch();
    const taskIds = useAppSelector(state => selectTaskIdsByTodoId(state, todoId));

    /**
     *
     * Creates 'iTaskHandlers' object, which Task UI component will use for updating global state
     *
     * @param {string} `id` task id
     *
     * @returns {iTaskHandlers} The `iTaskHandlers` object.
     *
     */
    const createTaskHandlers = (id: string): iTaskHandlers => {
        return {
            handleContentChange: (content) => dispatch(updateTaskContent({id, content})),
            handleTaskStatusToggle: () => dispatch(toggleTaskStatus({id})),
            handleRemoveTask: () => dispatch(removeTask({id})),
        }
    }

    const handleAddTask = () =>{
        dispatch(addTask({todoId}))
    }

    return <div className={'task-list'}>
        <div className={'tasks'}>
            {taskIds.map((taskId: string) => <Task
                key = {taskId}
                taskId={taskId}
                isEditable={isEditable}
                taskHandlers={createTaskHandlers(taskId)}
            />)}
        </div>
        {isEditable && <button className={'task-list__button-add'} onClick={handleAddTask}>+</button>}
    </div>
}

export default TaskList;