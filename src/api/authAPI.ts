import {User} from "../features/authentication/types.ts";
import ErrorWithCode from "../app/ErrorWithCode.ts";
import TokenManager from "../features/authentication/tokenManager.ts";

interface iData {
    users: User [],
    refreshTokens: {[key:number]: string},
    accessTokens: {[key:number]: string},
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
    error:ErrorWithCode<authErrors> | null,
    data: {
        user: User,
    } | null
}

const login = async (email: string, password: string): Promise<iLoginPromise> => {
    const user = Data.users.find(value => value.email === email);
    if (!user) return Promise.resolve({
        error: new ErrorWithCode<authErrors>('Wrong email or password', authErrors.WRONG_EMAIL_OR_PASSWORD),
        data: null,
    })

    if (user.password !== password) return Promise.resolve({
        error: new ErrorWithCode<authErrors>('Wrong email or password', authErrors.WRONG_EMAIL_OR_PASSWORD),
        data: null,
    })

    const refreshToken:string = Math.floor(Date.now() / 1000).toString();
    Data.refreshTokens[user.id] = refreshToken;
    const accessToken:string = Math.floor(Date.now() / 1000).toString();
    Data.accessTokens[user.id] = accessToken;

    TokenManager.getInstance().setTokens(accessToken, refreshToken);

    return Promise.resolve({
       error:null,
       data:{
           user: user,
       }
    })
}

const logout = async () => {

    const accessToken = TokenManager.getInstance().getAccessToken();

    let user:User | null = null;
    for(const key in Data.accessTokens) {
        if (Data.accessTokens[key] === accessToken) user = Data.users[key];
    }

    if (!user) return

    delete Data.accessTokens[user.id];
    delete Data.refreshTokens[user.id];
}

export const authAPI = {
    login,
    logout
}