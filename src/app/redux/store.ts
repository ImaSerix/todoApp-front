import {configureStore} from '@reduxjs/toolkit'
import todoReducer from "../../features/todo/redux/todoSlice.ts"
import authReducer from "../../features/authentication/authSlice.ts"
import taskReducer from "../../features/task/redux/taskSlice.ts"
import colorReducer from "../../features/color/redux/colorSlice.ts"
import {errorCatchingMiddleware} from "../middleware";

export const store = configureStore({
    reducer: {
        color: colorReducer,
        task: taskReducer,
        auth: authReducer,
        todo: todoReducer,
    },
    middleware: (gDM) => gDM().concat(errorCatchingMiddleware),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


