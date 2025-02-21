import { configureStore } from '@reduxjs/toolkit'
import todoReducer from "../../features/todo/todoSlice.ts"
import authReducer from "../../features/authentication/authSlice.ts"
import taskReducer from "../../features/task/taskSlice.ts"
import colorReducer from "../../features/color/colorSlice.ts"

export const store = configureStore({
    reducer: {
        color: colorReducer,
        task: taskReducer,
        todo: todoReducer,
        auth: authReducer
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch