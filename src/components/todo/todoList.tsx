import TodoCard from "./todoCard.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {addTodo, updateTodoTitleText, removeTodo, updateTodoColor} from "../../features/todov2/todoSlice.ts";
import {selectColorIds} from "../../features/color/colorSlice.ts";

// todo Если todo список пустой, то тоже надо что-то написать

interface iTodoListProps {
    todosIds: string[],
}

interface iTodoHandlers {
    handleAddTodo: () => void,
    handleTodoTitleTextUpdate: (title: string) => void,
    handleRemoveTodo: () => void,
    handleTodoColorUpdate: (colorId: string) => void,
}

const TodoList = ({todosIds}:iTodoListProps) => {

    const dispatch = useAppDispatch();
    const colors = useAppSelector (selectColorIds);

    const getRandomColorId = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    const createTodoHandlers = (id: string):iTodoHandlers => {
        return {
            handleAddTodo: () => dispatch(addTodo( {colorId: getRandomColorId()} )),
            handleTodoTitleTextUpdate: (title: string) => dispatch(updateTodoTitleText({id, title})),
            handleRemoveTodo: () => dispatch(removeTodo({id})),
            handleTodoColorUpdate: (colorId:string) => dispatch(updateTodoColor({id, colorId})),
        }
    }


    return <div className="todoList">
        {todosIds.length == 0? <div>{'Todo list is empty'}</div>: <>
            {todosIds.map(id => {
                return <TodoCard todoId={id}/>
            })}
        </>}
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