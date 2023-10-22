import { SelTicketI } from "./selticket.types";

export declare global {
    interface Window {
      selTicket?: SelTicketI,
      mountSelTicketWidget?: () => void,
    }
}
