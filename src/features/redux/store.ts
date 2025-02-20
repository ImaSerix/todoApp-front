import { configureStore } from '@reduxjs/toolkit'
import todoReducer from "../todo/todoSlice.ts"
import authReducer from "../authentication/authSlice.ts"
import taskReducer from "../task/taskSlice.ts"
import colorReducer from "../color/colorSlice.ts"

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