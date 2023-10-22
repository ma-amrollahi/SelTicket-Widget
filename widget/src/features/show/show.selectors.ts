import { RootState } from "../../types/store.types";
import { ShowStateI } from "./show.types";

export const selectShowState = (state: RootState) => state.show as Required<ShowStateI>

export const selectShow = (state: RootState) => state.show.show!

export const selectSchedule = (state: RootState) => state.show.schedule!