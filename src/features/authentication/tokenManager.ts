
class TokenManager {
    private static instance: TokenManager | null = null;

    private constructor() {}

    public static getInstance():TokenManager {
        if (TokenManager.instance == null) {
            TokenManager.instance = new TokenManager();
        }
        return TokenManager.instance;
    }

    public setTokens(accessToken: string, refreshToken:string): void {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
    }

    public removeTokens():void{
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }

    public getAuthHeader() : Record<string, string> {
        const accessToken = localStorage.getItem("accessToken");
        return accessToken ? { authorization: `Bearer ${accessToken}` } : {};
    }

    public renewToken(): void{
        console.log(`Renewing token... using: '${localStorage.getItem("refreshToken")}'`);
    }
}

export default TokenManager;