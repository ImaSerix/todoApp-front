import {User} from "./types.ts";
import {LOGIN_MUTATION, LOGOUT_MUTATION, REGISTER_MUTATION, RENEW_TOKEN_MUTATION} from "./authQueries.ts"
import client from "../../graphql/client.ts";

export interface iLoginPayload {
    loginUser: {
        accessToken: string,
        user: User,
    }
}

const login = async (email?: string, password?: string): Promise<iLoginPayload> => {
    const response = await client.mutate<iLoginPayload>({
        mutation: LOGIN_MUTATION,
        variables: {
            email,
            password,
        },
        context: {
            credentials: 'include'
        }
    })

    return response.data!;
}

export interface iLogoutPayload {
    logoutUser: boolean,
}

const logout = async (): Promise<iLogoutPayload> => {
    const response = await client.mutate<iLogoutPayload>({
        mutation: LOGOUT_MUTATION,
    })

    return response.data!;

}

export type iRegisterPayload = {
    registerUser: {
        accessToken: string,
        user: User,
    }
};

const register = async (args: {email: string, username: string, password: string}): Promise<iRegisterPayload> => {
    const response = await client.mutate<iRegisterPayload>({
        mutation: REGISTER_MUTATION,
        variables: args,
        context: {
            credentials: 'include'
        }
    })

    return response.data!;
}

export type iRenewTokenPayload = {
    renewAccessToken: {
        accessToken: string,
        user: User,
    }
}

export const renewToken = async (): Promise<iRenewTokenPayload> => {
    const response = await client.mutate<iRenewTokenPayload>({
        mutation: RENEW_TOKEN_MUTATION,
        context: {
            credentials: 'include'
        }
    })

    return response.data!;
}

export const authAPI = {
    login,
    register,
    logout,
    renewToken,
}