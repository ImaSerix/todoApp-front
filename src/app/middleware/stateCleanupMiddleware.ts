import {Middleware} from "@reduxjs/toolkit";
import {RootState} from "../redux/store.ts";


const stateCleanupMiddleware:Middleware<{}, RootState> = store => next => action => {

}