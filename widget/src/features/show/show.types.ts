import { SchedulesI } from "../../types/schedules.types";
import { ShowI } from "../../types/show.types";

export interface ShowStateI {
    show?: ShowI,
    schedule?: SchedulesI,
}