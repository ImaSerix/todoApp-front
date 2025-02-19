import Task from "./task.tsx";
import {useAppDispatch} from "../../hooks.ts";
import {removeTask, toggleTaskStatus, updateTaskContent} from "../../features/task/taskSlice.ts";

interface iTaskListProps {
    taskIds: string[],
    editMode: boolean,
}

export interface iTaskHandlers {
    handleContentChange: (content: string) => void,
    handleTaskStatusToggle: () => void,
    handleRemoveTask: () => void,
}

const TaskList = ({taskIds, editMode}: iTaskListProps) => {

    const dispatch = useAppDispatch();

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

    return <div className={'task-list'}>
        {taskIds.map((taskId: string) => <Task
            taskId={taskId}
            editMode={editMode}
            taskHandlers={createTaskHandlers(taskId)}
        />)}
    </div>
}

export default TaskList;