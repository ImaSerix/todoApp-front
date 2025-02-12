import {Todo, Task, Color} from "../features/todo/types.ts";
import client from "../graphQL/client.ts";
import {GET_DATA} from "../graphQL/todoQueries.ts";

type getDataPromise = {
    todos: Todo[] | null,
    tasks: Task[] | null,
    colors: Color[],
}

const getData = async (): Promise<getDataPromise> => {
    try{
        const response = await client.query<getDataPromise>({ query: GET_DATA});
        return response.data;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}

export const todoAPI = {
    getData,
}

