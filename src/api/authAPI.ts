import {User} from "../features/authentication/types.ts";
import TokenManager from "../features/authentication/tokenManager.ts";
import client from "../graphQL/client.ts";
import {LOGIN, LOGOUT} from "../graphQL/authQueries.ts";
import tokenManager from "../features/authentication/tokenManager.ts";

export const enum authErrors {
    WRONG_EMAIL_OR_PASSWORD,
}

interface iLoginPromise {
    login: {
        accessToken: string,
        refreshToken: string,
        user: User,
    } | null
}

const login = async (email: string, password: string): Promise<iLoginPromise> => {
    try {
        const response = await client.mutate<iLoginPromise>({
            mutation: LOGIN,
            variables: {
                email: email,
                password: password,
            }
        })
        if (!response.data || !response.data.login) return {login: null};

        tokenManager.getInstance().setTokens(response.data.login.accessToken, response.data.login.refreshToken);
        return response.data;
    } catch (error) {
        console.error('Ошибка авторизации', error);
        throw error;
    }
}

interface iLogoutPromise {
    logout: boolean,
}

const logout = async (): Promise<iLogoutPromise> => {
    try {
        const response = await client.mutate<iLogoutPromise>({
            mutation: LOGOUT,
        })

        if (!response.data) return {logout: false}

        console.log (response.data.logout)
        if (response.data.logout) TokenManager.getInstance().removeTokens();

        return response.data;
    } catch (error) {
        console.error('Ошибка выхода', error);
        throw error;
    }
}

export const authAPI = {
    login,
    logout,
}