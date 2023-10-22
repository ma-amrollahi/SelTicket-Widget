import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types/store.types";

const useAppDispatch: () => AppDispatch = useDispatch

export default useAppDispatch