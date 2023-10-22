import { RootState } from "../../types/store.types";
import { OrderStateI } from "./order.types";

export const selectOrderState = (state: RootState) => state.order as Required<OrderStateI>

export const selectSelectedSeats = (state: RootState) => state.order.selected!

export const selectOrder = (state: RootState) => state.order.order!