
// Represents TaskEntity from DB
export interface iTask{
    id: number,
    text: string,
    completed: boolean,
}

// Represents todoEntity from DB
export interface iTodo {
    id: number,
    title: string,
    tasks: number[],
}

