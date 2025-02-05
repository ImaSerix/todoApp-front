
class TokenManager {
    private static instance: TokenManager | null = null;
    private accessToken: string | null = null;
    private refreshToken: string | null = null;

    private constructor() {
        this.loadTokens();
    }

    private loadTokens() {
        this.accessToken = localStorage.getItem("accessToken")
        this.refreshToken = localStorage.getItem("accessToken")
    }

    public static getInstance():TokenManager {
        if (TokenManager.instance == null) {
            TokenManager.instance = new TokenManager();
        }
        return TokenManager.instance;
    }

    public setTokens(accessToken: string, refreshToken:string): void {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
    }

    // Remove when server will be developed
    public getAccessToken() {
        return this.accessToken;
    }

    public getAuthHeader() : Record<string, string> {
        return this.accessToken ? { Authorization: `Bearer ${this.accessToken}` } : {};
    }

    public renewToken(): void{
        console.log(`Renewing token... using: '${this.refreshToken}'`);
    }

}

export default TokenManager;