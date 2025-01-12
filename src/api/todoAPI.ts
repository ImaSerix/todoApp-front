import ErrorWithCode from "../app/ErrorWithCode.ts";
import {iTask, iTodo} from "../features/todo/types.ts";

interface iData {
    todos: iTodo[],
    tasks: iTask[],
}

export const enum todoAPIErrors {
    NO_SUCH_TODO,
    NO_SUCH_TASK,
    NO_SUCH_TASKS,
}

let nextTodoId = 2;
let nextTaskId = 6;

const data: iData = {
    todos: [
        {
            id: 0,
            title: "Some title",
            tasks: [0, 1, 2],
        },
        {
            id: 1,
            title: "Some title 2",
            tasks: [3, 4, 5],
        },
    ],
    tasks: [
        {
            id: 0,
            text: "Some task 0",
            completed: true,
        },
        {
            id: 1,
            text: "Some task 1",
            completed: true,
        },
        {
            id: 2,
            text: "Some task 2",
            completed: true,
        },
        {
            id: 3,
            text: "Some task 3",
            completed: false,
        },
        {
            id: 4,
            text: "Some task 4",
            completed: false,
        },
        {
            id: 5,
            text: "Some task 5",
            completed: true,
        },
    ]
}

const getTodos = async (): Promise<iTodo[]> => {
    return Promise.resolve(data.todos);
}

const getTasks = async (): Promise<iTask[]> => {
    return Promise.resolve(data.tasks);
}

type iGetTodoTasksOverload = {
    (todoId: number): Promise<iTask[]>;
    (todo: iTodo): Promise<iTask[]>;
}

const getTodoTasks: iGetTodoTasksOverload = async (param: number | iTodo): Promise<iTask[]> => {
    if (typeof param === 'number') {
        const todo: iTodo | undefined = data.todos.find(({id}) => id == param);
        if (!todo) throw new ErrorWithCode(`No such todo with id ${param}`, todoAPIErrors.NO_SUCH_TODO);

        const tasks: iTask[] = [];
        for (const taskId of todo.tasks) {
            tasks.push(await getTask(taskId));
        }

        return Promise.resolve(tasks);
    } else {
        const tasks: iTask[] = [];
        for (const taskId of param.tasks) {
            tasks.push(await getTask(taskId));
        }

        return Promise.resolve(tasks);
    }
}

const getTask = async (id: number): Promise<iTask> => {
    const task: iTask | undefined = data.tasks.find((task) => id === task.id);
    if (!task) throw new ErrorWithCode(`No such task with id ${id}`, todoAPIErrors.NO_SUCH_TASK);
    return Promise.resolve(task);
}

const addTodo = async ({title, tasks}: Omit<iTodo, 'id'>): Promise<iTodo> => {
    data.todos.push({id: nextTodoId++, title, tasks});
    return Promise.resolve(data.todos[data.todos.length - 1]);
}

const removeTodo = (id: number): number => {
    const filteredTodos: iTodo[] = data.todos.filter((todo) => todo.id !== id);
    if (filteredTodos.length === data.todos.length) {
        throw new ErrorWithCode<todoAPIErrors>(`No such todo with id: '${id}'`, todoAPIErrors.NO_SUCH_TODO);
    }

    data.todos = filteredTodos;
    return id;
}

const addTask = async ( { completed, text }: Omit<iTask, 'id'> ): Promise<iTask> =>{
    data.tasks.push({id: nextTaskId++, text, completed});
    return Promise.resolve(data.tasks[data.tasks.length - 1]);
}

const updateTask = async ( {id, text, completed }: iTask): Promise<iTask> => {
    const task = data.tasks.find((task) => task.id === id);
    if (!task) throw new ErrorWithCode(`No such task with id ${id}`, todoAPIErrors.NO_SUCH_TASK);
    task.text = text;
    task.completed = completed;
    return task;
}

const removeTasks = (tasks: number[]): Promise<number[]> => {
    const filteredTasks: iTask[] = data.tasks.filter(({id}) => id in tasks);

    if (filteredTasks.length === data.tasks.length) {
        throw new ErrorWithCode<todoAPIErrors>(`No such tasks id DB'`, todoAPIErrors.NO_SUCH_TASKS);
    }

    data.tasks = filteredTasks;
    return Promise.resolve(tasks);
}

const removeTask = (taskId: number): Promise<number> => {
    const filteredTasks: iTask[] = data.tasks.filter(({id}) => id !== taskId);
    if (filteredTasks.length === data.tasks.length) {
        throw new ErrorWithCode<todoAPIErrors>(`No such task with id: '${taskId}'`, todoAPIErrors.NO_SUCH_TASK);
    }

    data.tasks = filteredTasks;
    return Promise.resolve(taskId);
}

export const todoAPI = {
    getTodos,
    getTasks,
    getTodoTasks,
    getTask,
    addTodo,
    removeTodo,
    addTask,
    updateTask,
    removeTask,
    removeTasks,
}

