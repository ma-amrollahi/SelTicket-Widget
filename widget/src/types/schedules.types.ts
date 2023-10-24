import { IPlace } from "./place.types";

export interface ISchedule {
    id: number,
    title: string,
    address: string | null,
    contacts: null,
    image: string | null,
    province_id: number,
    city_id: number,
    lat: number | null,
    long: number | null,
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