import {ApolloError} from "@apollo/client";

export const enum errorCodes{
    UNKNOWN= "UNKNOWN",
    NOT_FOUND= "NOT_FOUND",
    DATABASE_ERROR= "DATABASE_ERROR",
    ACCESS_TOKEN_EXPIRED = "ACCESS_TOKEN_EXPIRED",
    REFRESH_TOKEN_EXPIRED = "REFRESH_TOKEN_EXPIRED",
    NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
    ALREADY_AUTHENTICATED = "ALREADY_AUTHENTICATED",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}


const handleError = (error:unknown): {code: string} =>{
    if (error instanceof ApolloError && error.cause) {

        console.error(['Handled ApolloError',error]);

        const extensions = (error.cause as { extensions?: { code: string } }).extensions;
        if (!extensions || !extensions.code) return { code: errorCodes.UNKNOWN };

        return {code: extensions.code}
    }
    else{
        console.error(['Handled unknown error',error]);
        return {code: errorCodes.UNKNOWN};
    }
}

export default handleError;