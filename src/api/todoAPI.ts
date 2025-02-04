import {Todo, Task} from "../features/todo/types.ts";

interface iData {
    todos: Todo[],
    tasks: Task[],
}

const nextTodoId = 2;
const nextTaskId = 6;

const data: iData = {
    todos: [
        {
            id: 0,
            title: "Some title",
            color: {
                red: 255,
                green:0,
                blue: 0,
                opacity: 0.8,
            },
            tasks: [
                {
                    id: 0,
                    text: "Some task 0",
                    completed: true,
                    todoId: 0,
                },
                {
                    id: 1,
                    text: "Some task 1",
                    completed: true,
                    todoId: 0,
                },
                {
                    id: 2,
                    text: "Some task 2",
                    completed: true,
                    todoId: 0,
                },
            ]
        },
        {
            id: 1,
            title: "Some title 2",
            color: {
                red: 125,
                green:125,
                blue: 0,
                opacity: 0.8,
            },
            tasks: [
                {
                    id: 3,
                    text: "Some task 3",
                    completed: false,
                    todoId: 1,
                },
                {
                    id: 4,
                    text: "Some task 4",
                    completed: false,
                    todoId: 1,
                },
                {
                    id: 5,
                    text: "Some task 5",
                    completed: true,
                    todoId: 1,
                },
            ]
        },
    ],
    tasks: [
        {
            id: 0,
            text: "Some task 0",
            completed: true,
            todoId: 0,
        },
        {
            id: 1,
            text: "Some task 1",
            completed: true,
            todoId: 0,
        },
        {
            id: 2,
            text: "Some task 2",
            completed: true,
            todoId: 0,
        },
        {
            id: 3,
            text: "Some task 3",
            completed: false,
            todoId: 1,
        },
        {
            id: 4,
            text: "Some task 4",
            completed: false,
            todoId: 1,
        },
        {
            id: 5,
            text: "Some task 5",
            completed: true,
            todoId: 1,
        },
    ]
}

type getDataPromise = {
    error: null,
    data: {
        todos: {
            data: Todo[],
            nextId: number,
        },
        tasks: {
            data: Task[],
            nextId: number,
        }
    }
}
const getData = async (): Promise<getDataPromise> => {
    return Promise.resolve({
        error: null,
        data: {
            todos: {
                data: data.todos,
                nextId: nextTodoId
            },
            tasks: {
                data: data.tasks,
                nextId: nextTaskId,
            }
        }
    });
}

// type getTodosPromise = {
//     data: {
//         nextId: number,
//         todos: Todo[]
//     }
// }
// const getTodos = async (): Promise<getTodosPromise> => {
//     return Promise.resolve({
//         data: {
//             nextId: nextTodoId,
//             todos: data.todos,
//         }
//     });
// }
//
// type getTasksPromise = {
//     data: {
//         nextId: number,
//         tasks: Task[]
//     }
// }
// const getTasks = async (): Promise<getTasksPromise> => {
//     return Promise.resolve({
//         data: {
//             nextId: nextTaskId,
//             tasks: data.tasks,
//         }
//     });
// }

// const getTodoTasks = async (todoId: number): Promise<Task[]> => {
//     const todo: Todo | undefined = data.todos.find((todo) => todo.id == todoId);
//     if (!todo) throw new ErrorWithCode(`No such todo with id ${todoId}`, todoAPIErrors.NO_SUCH_TODO);
//
//     const tasks: Task[] = [];
//     for (const taskId of todo.tasks) {
//         tasks.push(await getTask(taskId));
//     }
//
//     return Promise.resolve(tasks);
// }
//
// const getTask = async (id: number): Promise<Task> => {
//     const task: iTask | undefined = data.tasks.find((task) => id === task.id);
//     if (!task) throw new ErrorWithCode(`No such task with id ${id}`, todoAPIErrors.NO_SUCH_TASK);
//     return Promise.resolve(task);
// }

// const addTodo = async ({title, tasks}: Omit<iTodo, 'id'>): Promise<iTodo> => {
//     data.todos.push({id: nextTodoId++, title, tasks});
//     return Promise.resolve(data.todos[data.todos.length - 1]);
// }
//
// const removeTodo = (id: number): number => {
//     const filteredTodos: iTodo[] = data.todos.filter((todo) => todo.id !== id);
//     if (filteredTodos.length === data.todos.length) {
//         throw new ErrorWithCode<todoAPIErrors>(`No such todo with id: '${id}'`, todoAPIErrors.NO_SUCH_TODO);
//     }
//
//     data.todos = filteredTodos;
//     return id;
// }
//
// const addTask = async ({completed, text}: Omit<iTask, 'id'>): Promise<iTask> => {
//     data.tasks.push({id: nextTaskId++, text, completed});
//     return Promise.resolve(data.tasks[data.tasks.length - 1]);
// }
//
// const updateTask = async ({id, text, completed}: iTask): Promise<iTask> => {
//     const task = data.tasks.find((task) => task.id === id);
//     if (!task) throw new ErrorWithCode(`No such task with id ${id}`, todoAPIErrors.NO_SUCH_TASK);
//     task.text = text;
//     task.completed = completed;
//     return task;
// }
//
// const removeTasks = (tasks: number[]): Promise<number[]> => {
//     const filteredTasks: iTask[] = data.tasks.filter(({id}) => id in tasks);
//
//     if (filteredTasks.length === data.tasks.length) {
//         throw new ErrorWithCode<todoAPIErrors>(`No such tasks id DB'`, todoAPIErrors.NO_SUCH_TASKS);
//     }
//
//     data.tasks = filteredTasks;
//     return Promise.resolve(tasks);
// }
//
// const removeTask = (taskId: number): Promise<number> => {
//     const filteredTasks: iTask[] = data.tasks.filter(({id}) => id !== taskId);
//     if (filteredTasks.length === data.tasks.length) {
//         throw new ErrorWithCode<todoAPIErrors>(`No such task with id: '${taskId}'`, todoAPIErrors.NO_SUCH_TASK);
//     }
//
//     data.tasks = filteredTasks;
//     return Promise.resolve(taskId);
// }

export const todoAPI = {
    getData,
    // getTodos,
    // getTasks,
    // getTodoTasks,
    // getTask,
    // addTodo,
    // removeTodo,
    // addTask,
    // updateTask,
    // removeTask,
    // removeTasks,
}

