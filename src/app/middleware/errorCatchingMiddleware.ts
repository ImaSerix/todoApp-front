import {Middleware} from "@reduxjs/toolkit";
import {RootState} from "../redux/store.ts";


export const errorCatchingMiddleware: Middleware = store => next => action => {
    try {
        return next (action)
    }
    catch (error) {
        console.log((store.getState() as RootState).auth.user);
        console.log (error);
    }
}
