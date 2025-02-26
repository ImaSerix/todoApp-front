// import {Middleware} from "@reduxjs/toolkit";
// import {removeTodo, selectTodoById} from "../../features/todo/redux/todoSlice.ts";
// import {removeTask, removeTasks, selectTaskById} from "../../features/task/redux/taskSlice.ts";
//
// export const stateCleanupMiddleware:Middleware = store => next => action => {
//     if (typeof action === 'object' && action !== null && 'type' in action) {
//         if (action.type === removeTodo.type) {
//             const typedActon = action as ReturnType<typeof removeTodo>
//             const todo = selectTodoById(store.getState(), typedActon.payload.id);
//
//             const result = next(action);
//
//             if (todo) store.dispatch(removeTasks({ids: todo.taskIds}));
//             return result
//         }
//         else if (action.type === removeTask.type) {
//             const typedAction = action as ReturnType<typeof removeTask>
//             const task = selectTaskById(store.getState(), typedAction.payload.id);
//
//             const result = next(action);
//
//             if (task) store.dispatch(removeTaskFromTodo({todoId: task.todoId, taskId: task.id}));
//             return result
//         }
//     }
//     return next(action);
// }
