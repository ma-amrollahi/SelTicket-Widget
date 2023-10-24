import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISchedule } from "../../types/schedules.types";
import { IShow } from "../../types/show.types";
import { ShowStateI } from "./show.types";

const initialState: ShowStateI = {

}

export const showSlice = createSlice({
    name: "show",
    initialState,
    reducers: {
        reset: (state) => {
            state = initialState
        },
        setShow: (state, action: PayloadAction<IShow>) => {
            state.show = action.payload
        },
        setSchedule: (state, action: PayloadAction<ISchedule>) => {
            state.schedule = action.payload
        },
    },
})

export const showActions = showSlice.actions

export default showSlice.reducer