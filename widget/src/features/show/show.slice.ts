import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SchedulesI } from "../../types/schedules.types";
import { ShowI } from "../../types/show.types";
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
        setShow: (state, action: PayloadAction<ShowI>) => {
            state.show = action.payload
        },
        setSchedule: (state, action: PayloadAction<SchedulesI>) => {
            state.schedule = action.payload
        },
    },
})

export const showActions = showSlice.actions

export default showSlice.reducer