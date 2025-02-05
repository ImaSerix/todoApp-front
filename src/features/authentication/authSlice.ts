import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

interface iAuthState {
    user:{
        username: string | null,
        email: string | null,
        auth: boolean,
    }
}

const initialState: iAuthState = {
    user:{
        username: null,
        email: null,
        auth: false,
    }
}

const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, {rejectWithValue}) => {
        
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login: (state, action) => void,
        logout: (state) => void,
        refreshToken: (state) => void,
    },
})

export const {

} = authSlice.actions;

export default authSlice.reducer;