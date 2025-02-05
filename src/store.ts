import { configureStore } from '@reduxjs/toolkit'
import todoReducer from "./features/todo/todoSlice.ts"
import authReducer from "./features/authentication/authSlice.ts"

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        auth: authReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch