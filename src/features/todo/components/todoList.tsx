import TodoCard from "./todoCard.tsx";
import {useAppDispatch, useAppSelector} from "../../../hooks.ts";
import {addTodo, updateTodoTitleText, removeTodo, updateTodoColor} from "../redux/todoSlice.ts";
import {selectColorIds} from "../../color/redux/colorSlice.ts";
import saveUpdates from "../../../app/redux/saveUpdates.ts";

// todo Если todo список пустой, то тоже надо что-то написать

interface iTodoListProps {
    todoIds: string[],
}

export interface iTodoHandlers {
    handleTodoTitleTextUpdate: (title: string) => void,
    handleRemoveTodo: () => void,
    handleTodoColorUpdate: (colorId: string) => void,
}

const TodoList = ({todoIds}: iTodoListProps) => {

    const dispatch = useAppDispatch();
    const colors = useAppSelector(selectColorIds);

    const getRandomColorId = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    const createTodoHandlers = (id: string): iTodoHandlers => {
        return {
            handleTodoTitleTextUpdate: (title: string) => dispatch(updateTodoTitleText({id, title})),
            handleRemoveTodo: () => dispatch(removeTodo({id})),
            handleTodoColorUpdate: (colorId: string) => dispatch(updateTodoColor({id, colorId})),
        }
    }

    const handleAddTodo = () => {
        dispatch(addTodo({colorId: getRandomColorId()}))
    }

    const handleSaveUpdates = () =>{
        dispatch(saveUpdates());
    }

    return <div className="todoList">
        <div className={"todo-cards"}>
            {todoIds.length == 0 ? <div>{'Todo list is empty'}</div> : <>
                {todoIds.map(id => {
                    return <TodoCard key={id} todoId={id} todoHandlers={createTodoHandlers(id)}/>
                })}
            </>}
        </div>
        <button className={'todoList__button-add'} onClick={handleAddTodo}>
            <span className={`img-plus`}/>
        </button>
        <button className={'todoList__button-save-updates'} onClick={handleSaveUpdates}>
            <span className={`img-discrete`}/>
        </button>
    </div>


    // return <div className={'todo-list'}>
    //         {
    //             Object.keys(todos).length == 0 ? <div>{'Todo list is empty'}</div> :
    //                 Object.keys(todos).map((taskId) => {
    //                     const numericTaskId = Number(taskId);
    //                     const todo = todos[numericTaskId];
    //                     return <TodoCard
    //                         todo={todo}
    //                         key={numericTaskId}
    //                         tasks={todo.tasks.map(taskId => tasks[taskId])}
    //                         todoHandlers={todoHandlers}
    //                         taskHandlers={taskHandlers}/>
    //                 })
    //         }
    //     </div>
}
export default TodoList;