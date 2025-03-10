import {Todo, Task, Color} from "./types.ts";
import client from "../../graphql/client.ts";
import {DATA_QUERY, SAVE_UPDATES} from "./dataQueries.ts";

export interface iGetDataPayload {
    todos: Todo[],
    tasks: Task[],
    colors: Color[]
}

const getData = async (): Promise<iGetDataPayload> => {
    const response = await client.query<iGetDataPayload>({query: DATA_QUERY, variables: {}});
    return response.data;
}

export interface iSaveDataPayload {
    todos: Todo[],
    tasks: Task[],
    colors: Color[]
}

const saveUpdates = async (state: string): Promise<iSaveDataPayload> => {
    const response = await client.mutate<iSaveDataPayload>({
        mutation: SAVE_UPDATES, variables: {state}
    });
    return response.data!;
}

export const dataAPI = {
    getData,
    saveUpdates,
}

