import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {iTodo} from "./todo.tsx";

interface iTodoState {
    todos: iTodo[],
}

interface iChangeCheckBoxStatePayload{
    todoId:number,
    taskId:number,
    taskStatus:boolean,
}


const initialState: iTodoState = {
    todos: [
        {
            id: 0,
            title: "Some title",
            tasks: [
                {id: 0, text: "Some task 1", completed: false},
                {id: 1, text: "Some task 2", completed: true},
                {id: 2, text: "Some task 3", completed: true},
            ],
            completed: false,
        },
        {
            id: 1,
            title: "Some title 2",
            tasks: [
                {id: 0, text: "Some task 1", completed: true},
                {id: 1, text: "Some task 2", completed: true},
                {id: 2, text: "Some task 3", completed: true},
            ],
            completed: true,
        },
    ]
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        changeCheckBoxState: (state:iTodoState, action:PayloadAction<iChangeCheckBoxStatePayload>) => {
            console.log (action.payload);
            const todo = state.todos.find(( { id } ) => id == action.payload.todoId);
            if (!todo) return;

            const task = todo.tasks.find(( { id } ) => id == action.payload.taskId);
            if (!task) return;

            task.completed = !action.payload.taskStatus;

            todo.completed = !todo.tasks.find(({completed}) => !completed);
        }
    }
})

export const { changeCheckBoxState} = todoSlice.actions;
export default todoSlice.reducer;