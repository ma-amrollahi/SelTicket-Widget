import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderI } from "../../types/order.types";
import { BlockI } from "../../types/seats.types";
import { OrderStateI } from "./order.types";

const initialState: OrderStateI = {}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        reset: (state) => {
            state = initialState
        },
        setSelected: (state, action: PayloadAction<BlockI>) => {
            state.selected = action.payload
        },
        setOrder: (state, action: PayloadAction<OrderI>) => {
            state.order = action.payload
        },
    },
})

export const orderActions = orderSlice.actions

export default orderSlice.reducer