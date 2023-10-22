import { PlaceI } from "./place.types";

export interface SchedulesI {
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

export interface SchedulesInfoI {
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

export interface PlaceWithSchedulesI extends PlaceI {
    schedules: SchedulesI[],
}

export interface DayI extends SchedulesInfoI {
    places: PlaceWithSchedulesI[],
}