import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../app/redux/store.ts";
import loadData from "../../../app/redux/loadData.ts";
import {Color} from "../../../app/services/data/types.ts";

interface iColor {
    id: string,
    red: number,
    green: number,
    blue: number,
    opacity: number,
}


interface iColorState {
    byId: Record<string, iColor>;
    allIds: string[];
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected',
}

const initialState: iColorState = {
    byId: {},
    allIds: [],
    loading: 'idle',
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
            state.allIds = [];

            for (const color of action.payload.colors) {
                state.byId[color.id] = color;
                state.allIds.push(color.id);
            }
        }
    },
    //todo Write some docs
    extraReducers: (builder) => {
        builder.addCase(loadData.pending, (state) => {
            state.loading = 'pending';
        })
        builder.addCase(loadData.fulfilled, (state, action) => {
            state.loading = 'fulfilled';

            state.byId = {};
            state.allIds = [];

            const colorsData:Color[] = action.payload!.colors;

            colorsData.forEach(color => {
                state.byId[color.id] = color;
                state.allIds.push(color.id);
            })
        })
    }
})

export const selectColorLoading = (state: RootState) => state.color.loading;

export const selectColorById = createSelector([
        (_: RootState, colorId: string) => colorId,
        (state: RootState) => state.color.byId],
    (colorId, colorsById) => colorsById[colorId])

export const selectColorIds = (state: RootState) => state.color.allIds;

export const selectAllColors = createSelector([
    (state: RootState) => state.color.allIds,
    (state: RootState) => state.color.byId,],
    (allIds, colorById) => allIds.map((colorId) => colorById[colorId]))

export const {
    setColors,
} = colorSlice.actions;
export default colorSlice.reducer;