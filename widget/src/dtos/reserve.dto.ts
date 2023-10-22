export interface ReserveDtoI {
    seat_ids: number[],
    schedule_id: string,
    block_id: string,
    applicationId?: string,
}