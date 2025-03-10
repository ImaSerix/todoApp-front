import {createAsyncThunk} from "@reduxjs/toolkit";
import {dataAPI, iSaveDataPayload} from "../services/data/dataAPI.ts";
import {iTask, selectDeletedTaskIds, selectUpdatedTasks} from "../../features/task/redux/taskSlice.ts";
import {iTodo, selectDeletedTodoIds, selectUpdatedTodos} from "../../features/todo/redux/todoSlice.ts";
import {RootState} from "./store.ts";
import handleError, {errorCodes} from "../utils/handleError.js";
import {renewToken} from "../../features/authentication/redux/authSlice.js";

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

const saveUpdates = createAsyncThunk<
    iSaveDataPayload,
    void,
    {
        rejectValue: { code: string }
    }
>(
    'data/saveData',
    async (_, thunkAPI) => {
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

        try{
            return await dataAPI.saveUpdates(JSON.stringify(state));
        }
        catch (error){
            const err = handleError(error)

            if (err.code === errorCodes.NOT_AUTHENTICATED){
                const renewTokenResult = await thunkAPI.dispatch(renewToken());

                console.log('Trying get new Access token!');

                if (renewToken.fulfilled.match(renewTokenResult)) {
                    try {
                        return await dataAPI.saveUpdates(JSON.stringify(state));
                    } catch (error) {
                        return thunkAPI.rejectWithValue(handleError(error));
                    }
                } else {
                    return thunkAPI.rejectWithValue({ code: errorCodes.REFRESH_TOKEN_EXPIRED });
                }
            }
            else return thunkAPI.rejectWithValue(err);
        }
    }
)

export default saveUpdates;