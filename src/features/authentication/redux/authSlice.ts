import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    authAPI,
    iLoginPayload,
    iLogoutPayload,
    iRegisterPayload,
    iRenewTokenPayload
} from "../../../app/services/auth/authAPI.ts";
import {RootState} from "../../../app/redux/store.ts";
import handleError, {errorCodes} from "../../../app/utils/handleError.js";

interface iUser{
    username: string,
    email: string,
}

export interface iAuthState {
    user: iUser | null,
    accessToken: string | null,
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected',
    error: string | null,
}

const initialState: iAuthState = {
    user: null,
    accessToken: null,
    loading: 'idle',
    error: null,
}

export const login = createAsyncThunk<
    iLoginPayload,
    { email: string, password: string },
    {
        rejectValue: { code: string }
    }>(
    'auth/login',
    async (arg, thunkAPI) => {
        try {
            return await authAPI.login(arg.email, arg.password);
        } catch (error) {
            return thunkAPI.rejectWithValue(handleError(error));
        }
    }
)

export const logout = createAsyncThunk<
    iLogoutPayload,
    void,
    {
        rejectValue: { code: string }
    }>(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            return await authAPI.logout();
        } catch (error) {
            return thunkAPI.rejectWithValue(handleError(error));
        }
    }
)

export const renewToken = createAsyncThunk<
    iRenewTokenPayload,
    void,
    {
        rejectValue: {
            code: string,
        }
    }>(
    'auth/renewToken',
    async (_, thunkAPI) => {
        try {
            return await authAPI.renewToken();
        } catch (error) {
            return thunkAPI.rejectWithValue(handleError(error));
        }
    }
)

export const register = createAsyncThunk<
    iRegisterPayload,
    { email: string, username: string, password: string },
    {
        rejectValue: { code: string }
    }>(
    'auth/register',
    async (args, thunkAPI) => {
        try {
            return await authAPI.register(args)
        } catch (error) {
            return thunkAPI.rejectWithValue(handleError(error));
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
            state.error = null;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = 'fulfilled';
            const loginPayload = action.payload.loginUser;
            state.user = loginPayload.user;
            state.accessToken = loginPayload.accessToken;
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = 'rejected';
            if (action.payload?.code === 'NOT_FOUND') state.error = 'Wrong email or password';
            if (action.payload?.code === 'UNKNOWN') state.error = 'Something went wrong. Try again later!';
        })
        builder.addCase(logout.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.loading = 'fulfilled';
            state.user = null;
            state.accessToken = null;
        })
        builder.addCase(logout.rejected, (state, action) => {
            state.loading = 'rejected';
            if (action.payload?.code === 'NOT_AUTHENTICATED') {
                state.error = 'You already logout!';
                state.user = null;
                state.accessToken = null;
            } else state.error = 'Something went wrong. Try again later!';
        })
        builder.addCase(register.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = 'fulfilled';
            state.accessToken = action.payload.registerUser.accessToken;
            state.user = action.payload.registerUser.user;
        })
        builder.addCase(register.rejected, (state, action) => {
            state.loading = 'rejected';
            if (action.payload?.code === errorCodes.ALREADY_AUTHENTICATED) {
                state.error = 'You already authenticated!';
            } else state.error = 'Something went wrong. Try again later!';
        })
        builder.addCase(renewToken.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        })
        builder.addCase(renewToken.fulfilled, (state, action) => {
            state.loading = 'fulfilled';
            state.user = action.payload.renewAccessToken.user;
            state.accessToken = action.payload.renewAccessToken.accessToken;
        })
        builder.addCase(renewToken.rejected, (state, action)=>{
            state.loading = 'rejected';
            if (action.payload?.code === errorCodes.REFRESH_TOKEN_EXPIRED) {
                state.error = 'Your refresh token is invalid';
            } else state.error = 'Something went wrong. Try again later!';
        })
    },
})

export const selectUsername = (state:RootState) => state.auth.user?.username || null;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectIsUserAuth = (state: RootState) => state.auth.user !== null;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;