export interface IPlace {
    id: number,
    title: string,
    address: string,
    contacts: PlaceContactI[],
    image: string | null,
    province_id: number,
    city_id: number,
    lat: number,
    long: number,
}

export interface PlaceContactI {}