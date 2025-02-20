import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store/store.ts";

interface iColor {
    id: string,
    red: number,
    green: number,
    blue: number,
    opacity: number,
}


interface iColorState {
    byId: Record<string, iColor>;
    allIds: Set<string>;
}

const initialState: iColorState = {
    byId: {},
    allIds: new Set<string>(),
}


const colorSlice = createSlice({
    name: "color",
    initialState: initialState,
    reducers: {
        /**
         *
         * Sets colors which are fetched from server.
         *
         * @param {iTaskState} state - The current state of the colors.
         * @param {PayloadAction<{ colors: iColor[] }} action - An action object with the `colors` fetched from server.
         * @param {iColor[]} action.payload.colors - List with colors from server.
         *
         * @returns {void} This reducer doesn't return any value
         */
        setColors: (state, action: PayloadAction<{ colors: iColor[] }>) => {
            state.byId = {};
            state.allIds = new Set<string>();

            for (const color of action.payload.colors) {
                state.byId[color.id] = color;
                state.allIds.add(color.id);
            }
        }
    }
})

export const selectColorById = createSelector([
        (_: RootState, colorId: string) => colorId,
        (state: RootState) => state.color.byId],
    (colorId, colorsById) => colorsById[colorId])

export const selectColorIds = createSelector([
    (state: RootState) => state.color.allIds],
    (colorAllIds) => colorAllIds)

export const selectAllColors = createSelector([
    (state: RootState) => state.color.allIds,
    (state: RootState) => state.color.byId,],
    (allIds, colorById) => [...allIds].map((colorId) => colorById[colorId]))

export const {
    setColors,
} = colorSlice.actions;
export default colorSlice.reducer;