export interface OrderI {
    order_id: number,
    final_price: number,
    // seller_final_price: number,
    customer_final_price: number,
    // wallet: WalletI,
}

export interface WalletI {
    balance: number,
    reserved: number,
    total: number,
}

export interface OrdersListI{
    result: Array<OrderListDataI>,
    totalRowCount: number
}

export interface OrderListDataI {
    orderId: number,
    showName: string,
    placeName: string,
    showDay: string,
    showTime: string,
    showImageUrl: string,
    ticketCount: number,
    status: number,
    transactionId: string
}

export interface OrderDetailsDataI{
    id: number,
    order_id: number,
    block_type: string,
    code: string,
    owner_mobile: string,
    show_name: string,
    place_name: string,
    place_address: string,
    price: number,
    price_id: number,
    final_price: number,
    customer_final_price: number,
    persian_date: string,
    show_image_url: string,
    created_at_hour: string,
    created_at: string,
    tickets_count: number,
    tickets: ticketDetailsForOrderDetailsI[],
    start_at_hour: string,
    start_at_date: string,
    start_at: string,
    status: string,
    tax: number,
}

export interface ticketDetailsForOrderDetailsI{
    id: number,
    price: number,
    final_price: number,
    block_name: string,
    code: string,
    block_type: string,
    seat_id: number,
    row: string,
    number: number,
    is_coupon_used: boolean,
}
