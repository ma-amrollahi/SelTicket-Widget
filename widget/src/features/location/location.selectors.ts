import { RootState } from "../../types/store.types";

export const selectLocation = (state: RootState) => state.location

export const selectProvince = (state: RootState) => state.location.province

export const selectCity = (state: RootState) => state.location.city