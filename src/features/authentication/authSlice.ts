import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../../app/services/auth/authAPI.ts";
import {iUser} from "./types.ts";
import {RootState} from "../../app/redux/store.ts";

export interface iAuthState {
    user: iUser | null,
    accessToken: string | null,
    csrfToken: string | null,
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected',
}

const initialState: iAuthState = {
    user: null,
    accessToken: null,
    csrfToken: null,
    loading: 'idle',
}

export const login = createAsyncThunk(
    'auth/login',
    async (arg: { email: string, password: string }) => {
        try {
            const response = await authAPI.login(arg.email, arg.password);
            return response.login!;
        } catch (error) {
            console.log(error)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        try {
            const response = await authAPI.logout();
            return response.logout!;
        } catch (error) {
            console.log(error);
        }
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(login.pending, (state) => {
            state.loading = 'pending';
            state.user = null;
            state.csrfToken = null;
            state.accessToken = null;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = 'fulfilled';
            state.user = action.payload!.user;
            state.accessToken = action.payload!.accessToken;
            state.csrfToken = action.payload!.csrfToken
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.loading = 'fulfilled';
            state.user = null;
            state.csrfToken = null;
            state.accessToken = null;
        })
    },
})

export const selectAuthLoading = (state: RootState) => state.auth.loading;

export const selectAccessToken = createSelector([
        (state: RootState) => state.auth],
    (authState) => authState.accessToken)

export const selectCSRFToken = createSelector([
        (state: RootState) => state.auth],
    (authState) => authState.csrfToken)

export const selectUser = createSelector([
        (state: RootState) => state.auth],
    (authState) => authState.user)
// export const {
//
// } = authSlice.actions;

export default authSlice.reducer;