import {Todo, Task, Color} from "../features/todo/types.ts";
import client from "../../graphQL/client.ts";

// Type of to-do entity in the server
type Todo = {
    id?: string,
    title?: string,
    colorId?:string,
    userId?:string,
}

interface getTodosPromise{
    todos: Todo[],
}

const getTodos = async (): Promise<getTodosPromise> => {
    try{
        const response = await client.query<getTodosPromise>({ query: GET_TODOS});
        return response.data;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}

// Todo Нужно будет сделать и это тоже
// const mutateTodos = async (): Promise<void> => {}

export const todoAPI = {
    getTodos,
}

