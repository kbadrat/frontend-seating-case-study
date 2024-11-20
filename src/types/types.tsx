/* Event */

export interface IEvent {
    eventId: string;
    namePub: string;
    description: string;
    currencyIso: string;
    dateFrom: string | Date;
    dateTo: string | Date;
    headerImageUrl: string;
    place: string;
}

/* Ticket and Seating */

export interface ITicketType {
    id: string;
    name: string;
    price: number;
}

export interface ISeat {
    seatId: string;
    place: number;
    ticketTypeId: string;
}

export interface ISeatRow {
    seatRow: number;
    seats: ISeat[];
}

export interface IEventTicketsResponse {
    ticketTypes: ITicketType[];
    seatRows: ISeatRow[];
}

/* Login 
email: frontend@nfctron.com
password: Nfctron2025
*/

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
}

export interface ILoginInput {
    email: string;
    password: string;
}

export interface ILoginResponse {
    message: string;
    user: IUser;
}

/* Order */

export interface IOrderTicket {
    ticketTypeId: string;
    seatId: string;
}

export interface IOrderInput {
    eventId: string;
    tickets: IOrderTicket[] | null;
    user: IUser | null;
}

export interface IOrderResponse {
    message: string;
    orderId: string;
    tickets: IOrderTicket[];
    user: IUser;
    totalAmount: number;
}
