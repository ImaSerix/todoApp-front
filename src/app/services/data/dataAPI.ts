import {Todo, Task, Color} from "./types.ts";
import client from "../../../graphql/client.ts";
import {GET_DATA, SAVE_UPDATES} from "./dataQueries.ts";

interface getDataPromise {
    todos: Todo[],
    tasks: Task[],
    colors: Color[]
}

// todo Там сейчас список возвращается не совсем как список, в общем смотри схему, надо переделать запрос за todo

const getData = async (): Promise<getDataPromise> => {
    try {
        const response = await client.query<getDataPromise>({query: GET_DATA});
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

interface saveDataPromise {
    saveUpdates: boolean;
}

const saveUpdates = async (state: string): Promise<saveDataPromise> => {
    try {
        const response = await client.mutate<saveDataPromise>({
            mutation: SAVE_UPDATES, variables: {state}
        });
        return response.data!;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const dataAPI = {
    getData,
    saveUpdates,
}

