import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../types/store.types";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default useAppSelector