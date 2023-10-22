export interface BlockUnsanitizedI {
    block_id: number,
    seats: SeatUnsanitizedT[],
}

export type SeatUnsanitizedT = [
    number,
    number,
    number,
    number,
    string,
    string,
    number,
    number,
]

export interface BlockI {
    block_id: number,
    seats: SeatI[],
}

export interface SeatI {
    schedule_seat_id: number,
    seat_id: number,
    x: number,
    y: number,
    type: string,
    row: string,
    number: number,
    price: number,
}

export type SeatStatus = Record<string, number>