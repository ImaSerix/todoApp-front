import {combineReducers, configureStore} from '@reduxjs/toolkit'
import todoReducer from "../../features/todo/redux/todoSlice.ts"
import authReducer from "../../features/authentication/redux/authSlice.ts"
import taskReducer from "../../features/task/redux/taskSlice.ts"
import colorReducer from "../../features/color/redux/colorSlice.ts"

const rootReducer = combineReducers({
    color: colorReducer,
    task: taskReducer,
    auth: authReducer,
    todo: todoReducer,
})



export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


