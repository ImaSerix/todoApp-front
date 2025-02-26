import {createAsyncThunk} from "@reduxjs/toolkit";
import {dataAPI} from "../services/data/dataAPI.ts";
import {iTask, selectDeletedTaskIds, selectUpdatedTasks} from "../../features/task/redux/taskSlice.ts";
import {iTodo, selectDeletedTodoIds, selectUpdatedTodos} from "../../features/todo/redux/todoSlice.ts";
import {RootState} from "./store.ts";
import loadData from "./loadData.ts";

interface iUpdatedStateData{
    todos:{
        updated: iTodo[],
        deleted: string[],
    },
    tasks:{
        updated: iTask[],
        deleted: string[],
    }
}

const saveUpdates = createAsyncThunk(
    'data/saveData',
    async (_, thunkAPI) => {
        try{
            const state:iUpdatedStateData = {
                todos:{
                    updated: selectUpdatedTodos(thunkAPI.getState() as RootState),
                    deleted: selectDeletedTodoIds(thunkAPI.getState() as RootState)
                },
                tasks:{
                    updated:selectUpdatedTasks(thunkAPI.getState() as RootState),
                    deleted:selectDeletedTaskIds(thunkAPI.getState() as RootState)
                }
            }
            const result = await dataAPI.saveUpdates(JSON.stringify(state));
            if (result.saveUpdates) thunkAPI.dispatch(loadData());
        }
        catch (error){
            console.log (error);
        }
    }
)

export default saveUpdates;