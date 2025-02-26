import {User} from "./types.ts";
import {LOGIN, LOGOUT} from "./authQueries.ts"
import client from "../../../graphql/client.ts";

export const enum authErrors {
    WRONG_EMAIL_OR_PASSWORD,
}

interface iLoginPromise {
    login: {
        accessToken: string | null,
        csrfToken: string | null,
        user: User | null,
    }
}

const login = async (email?: string, password?: string): Promise<iLoginPromise> => {
    try {
        const response = await client.mutate<iLoginPromise>({
            mutation: LOGIN,
            variables: {
                email: email,
                password: password,
            }
        })

        return response.data!;
    } catch (error) {
        console.error('Ошибка авторизации', error);
        // throw error;
        return Promise.reject(error);
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

        return response.data!;
    } catch (error) {
        console.error('Ошибка выхода', error);
        throw error;
    }
}

export const authAPI = {
    login,
    logout,
}