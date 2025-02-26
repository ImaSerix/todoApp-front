import {createAsyncThunk} from "@reduxjs/toolkit";
import {dataAPI} from "../services/data/dataAPI.ts";


const loadData = createAsyncThunk(
    'data/loadData',
    async () => {
        try{
            return await dataAPI.getData();
        }
        catch (error){
            console.log (error);
        }
    }
)

export default loadData;