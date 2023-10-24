import { IPlace } from "./place.types";

export interface ISchedule {
    id:             number;
    title:          string;
    description:    null;
    prices:         number[];
    show_id:        number;
    show_name:      string;
    venue_id:       number;
    venue_name:     string;
    place_id:       number;
    place_name:     string;
    sales_start_at: Date;
    sales_end_at:   Date;
    date:           Date;
    start_at:       string;
    persian_date:   string;
    status:         string;
}

export interface ISchedulenfoI {
    day: number,
    weekDay: string,
    month: string,
    // time: TimeI,
}

export interface TimeI {
    hour: number,
    minute: number,
}

export enum WeekDayE {
    "شنبه",
    "یک‌شنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
}

export interface PlaceWithISchedule extends IPlace {
    schedules: ISchedule[],
}

export interface DayI extends ISchedulenfoI {
    places: PlaceWithISchedule[],
}