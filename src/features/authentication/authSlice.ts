import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../../api/authAPI.ts";
import {iUser} from "./types.ts";

export interface iAuthState {
    user:iUser | null,
    auth:boolean,
}

const initialState: iAuthState = {
    user:null,
    auth: false,
}


interface iLoginPayload{
    email: string,
    password: string,
}
export const login = createAsyncThunk(
    'auth/login',
    async (arg:iLoginPayload, thunkAPI) => {
        const response = await authAPI.login(arg.email, arg.password);

        if (!response.data) thunkAPI.rejectWithValue('Some error');

        return response.data!.user;
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logout: (state) => {
            if (state.user){
                authAPI.logout();
            }

            state.user = null;
            state.auth = false;
        },
    },
    extraReducers:builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
            state.auth = true;
        })
    },
})


export const {
    logout
} = authSlice.actions;

export default authSlice.reducer;