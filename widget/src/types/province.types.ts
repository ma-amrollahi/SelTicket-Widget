export type ProvincesT = Record<string, string>

export type CitiesT = ProvincesT

export interface ProvinceI {
    id: number,
    name: string,
}

export interface CityI extends ProvinceI {}