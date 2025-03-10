
// Types which defines data which is returned from the server

export type Todo = {
    id: string,
    title: string,
    colorId:string,
    userId:string,
}

export type Task = {
    id: string,
    todoId: string,
    content: string,
    completed:boolean,
}

export type Color = {
    id: string,
    red: number,
    green: number,
    blue: number,
    opacity: number,
}