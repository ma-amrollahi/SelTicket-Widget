import { OrderI } from "../../types/order.types";
import { BlockI } from "../../types/seats.types";

export interface OrderStateI {
    selected?: BlockI,
    order?: OrderI,
}