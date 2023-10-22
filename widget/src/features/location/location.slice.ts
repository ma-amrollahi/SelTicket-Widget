import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CityI, ProvinceI } from "../../types/province.types";
import { LocationStateI } from "./location.types";

const initialState: LocationStateI = {
}

export const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        reset: (state) => {
            state = initialState
        },
        setProvince: (state, action: PayloadAction<ProvinceI>) => {
            state.province = action.payload
            state.city = undefined
        },
        setCity: (state, action: PayloadAction<CityI>) => {
            if (typeof state.province !== "undefined") {
                state.city = action.payload
            }
        },
    },
})

export const locationActions = locationSlice.actions

export default locationSlice.reducer