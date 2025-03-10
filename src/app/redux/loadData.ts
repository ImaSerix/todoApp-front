import {createAsyncThunk} from "@reduxjs/toolkit";
import {dataAPI, iGetDataPayload} from "../services/data/dataAPI.ts";
import handleError, {errorCodes} from "../utils/handleError.js";
import {renewToken} from "../../features/authentication/redux/authSlice.js";


const loadData = createAsyncThunk<
    iGetDataPayload,
    void,
    {
        rejectValue: {
            code: string
        }
    }
>(
    'data/loadData',
    async (_: void, thunkAPI) => {
        try {
            return await dataAPI.getData();
        } catch (error) {
            const err = handleError(error)
            if (err.code === errorCodes.NOT_AUTHENTICATED){
                const renewTokenResult = await thunkAPI.dispatch(renewToken());

                if (renewToken.fulfilled.match(renewTokenResult)) {
                    try {
                        return await dataAPI.getData();
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

export default loadData;