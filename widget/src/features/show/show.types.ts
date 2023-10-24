import { ISchedule } from "../../types/schedules.types";
import { IShow } from "../../types/show.types";

export interface ShowStateI {
    show?: IShow,
    schedule?: ISchedule,
}