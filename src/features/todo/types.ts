// Represents TaskEntity from DB
export type Task = {
    id: number,
    text: string,
    completed: boolean,
    todoId: number,
}


export interface iTask {
    id:number,
    idInDb: number | null, //id in db, null if it was created and doesn't synchronize with DB
    text: string,
    completed: boolean,
    todoId: number,
}

// Represents todoEntity from DB
export type Todo = {
    id: number,
    title: string,
    tasks: Task[],
}

export interface iTodo {
    id:number,
    idInDb: number | null, //id in db, null if it was created and doesn't synchronize with DB
    title: string,
    tasks: number[], //Front app tasks ids, which given them temporary, before synchronize with DB
    editMode: boolean,
}

