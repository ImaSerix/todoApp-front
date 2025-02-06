import {User} from "../features/authentication/types.ts";
import TokenManager from "../features/authentication/tokenManager.ts";

interface iData {
    users: User [],
    refreshTokens: {[key:number]: string},
    accessTokens: {[key:string]: number},
}

const Data:iData = {
    users: [
        {
            id: 1,
            username: 'persix',
            email: 'persix@test.lv',
            password: 'goodPass',
        },
        {
            id: 2,
            username: 'nicePerson',
            email: 'nice@test.lv',
            password: 'nicePass',
        },
        {
            id: 3,
            username: 'badPerson',
            email: 'bad@test.lv',
            password: 'badPass',
        },
    ],
    refreshTokens: {},
    accessTokens: {},
}

export const enum authErrors {
    WRONG_EMAIL_OR_PASSWORD,
}

interface iLoginPromise {
    error:string | null,
    data: {
        user: User,
    } | null
}

const login = async (email: string, password: string): Promise<iLoginPromise> => {
    const user = Data.users.find(value => value.email === email);
    if (!user) return Promise.resolve({
        error: 'Wrong pass or email',
        data: null,
    })

    if (user.password !== password) return Promise.resolve({
        error: 'Wrong pass or email',
        data: null,
    })

    const refreshToken:string = Math.floor(Date.now() / 1000).toString();
    Data.refreshTokens[user.id] = refreshToken;
    const accessToken:string = Math.floor(Date.now() / 1000).toString();
    Data.accessTokens[accessToken] = user.id;

    TokenManager.getInstance().setTokens(accessToken, refreshToken);

    return Promise.resolve({
       error:null,
       data:{
           user: user,
       }
    })
}

const logout = () => {

    const accessToken = TokenManager.getInstance().getAccessToken();
    if (!accessToken) return;

    const user = Data.users.find(user => user.id === Data.accessTokens[accessToken]);

    if (!user) return;

    TokenManager.getInstance().removeTokens();

    delete Data.accessTokens[accessToken];
    delete Data.refreshTokens[user.id];
}


// Dev function
const getUserFromToken = () => {
    const token = TokenManager.getInstance().getAccessToken();
    if (!token) return null;

    return Data.users.find(user => user.id === Data.accessTokens[token]);
}

export const authAPI = {
    login,
    logout,
    getUserFromToken,
}