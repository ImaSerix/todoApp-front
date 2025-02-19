import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../../api/authAPI.ts";
import {iUser} from "./types.ts";

export interface iAuthState {
    user: iUser | null,
    auth: boolean,
}

const initialState: iAuthState = {
    user: null,
    auth: false,
}


interface iLoginPayload {
    email: string,
    password: string,
}

export const login = createAsyncThunk(
    'auth/login',
    async (arg: iLoginPayload, thunkAPI) => {
        const response = await authAPI.login(arg.email, arg.password);

        if (!response.login) thunkAPI.rejectWithValue('Login error');

        return response.login!.user;
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        const response = await authAPI.logout();
        if (!response.logout) thunkAPI.rejectWithValue('Logout error');
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
            state.auth = true;
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.user = null;
            state.auth = false;
        })
    },
})


// export const {
//
// } = authSlice.actions;

export default authSlice.reducer;