import { createContext, useState, useContext, ReactNode } from "react";
import {
    IEvent,
    IEventTicketsResponse,
    IOrderInput,
    IOrderTicket,
} from "@/types/types";

interface CartContextType {
    cart: IOrderInput;
    setCart: React.Dispatch<React.SetStateAction<IOrderInput>>;
    isTicketInCart: (seatId: string) => boolean;
    addTicketToCart: (ticket: IOrderTicket) => void;
    removeTicketFromCart: (ticket: IOrderTicket) => void;
    totalPrice: number;
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
    changeTotalPrice: (value: number, increase: boolean) => void;
    currency: string;
    setCurrency: React.Dispatch<React.SetStateAction<string>>;
    getTotalTickets: () => number;
    tickets: IEventTicketsResponse | null;
    setTickets: React.Dispatch<
        React.SetStateAction<IEventTicketsResponse | null>
    >;
    getTicketPrice: (ticketType: string) => number | null;
    getTicketRow: (seatId: string) => number | null;
    getTicketPlace: (seatId: string) => number | null;
    getEventDetails: () => {
        name: string;
        dateFrom: string | Date | null;
        dateTo: string | Date | null;
    };
    setEventDetails: React.Dispatch<React.SetStateAction<IEvent | null>>;
    getTicketTypeName: (ticketTypeId: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<IOrderInput>({
        eventId: "",
        tickets: null,
        user: undefined,
    });
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [currency, setCurrency] = useState<string>("CZK");
    const [tickets, setTickets] = useState<IEventTicketsResponse | null>(null);
    const [eventDetails, setEventDetails] = useState<IEvent | null>(null);

    const getTotalTickets = (): number => {
        return cart.tickets?.length ?? 0;
    };

    const changeTotalPrice = (value: number, increase: boolean) => {
        setTotalPrice((prevTotal) =>
            increase ? prevTotal + value : prevTotal - value
        );
    };

    const isTicketInCart = (seatId: string): boolean => {
        return cart.tickets?.some((seat) => seat.seatId === seatId) ?? false;
    };

    const getTicketPrice = (ticketType: string): number => {
        const foundType = tickets?.ticketTypes.find(
            (type) => type.id === ticketType
        );
        return foundType ? foundType.price : 0;
    };

    const getTicketRow = (seatId: string): number => {
        if (!tickets) throw new Error("Tickets data is not available");
        for (let rowIndex = 0; rowIndex < tickets.seatRows.length; rowIndex++) {
            const row = tickets.seatRows[rowIndex];
            if (row.seats.some((seat) => seat.seatId === seatId))
                return rowIndex + 1;
        }
        throw new Error(`Row for seatId ${seatId} not found`);
    };

    const getTicketPlace = (seatId: string): number => {
        if (!tickets) throw new Error("Tickets data is not available");
        for (const row of tickets.seatRows) {
            const seat = row.seats.find((seat) => seat.seatId === seatId);
            if (seat) return seat.place;
        }
        throw new Error(`Place for seatId ${seatId} not found`);
    };

    const addTicketToCart = (ticket: IOrderTicket) => {
        setCart((prevCart) => ({
            ...prevCart,
            tickets: prevCart.tickets
                ? [...prevCart.tickets, ticket]
                : [ticket],
        }));
        changeTotalPrice(getTicketPrice(ticket.ticketTypeId), true);
    };

    const removeTicketFromCart = (ticket: IOrderTicket) => {
        setCart((prevCart) => ({
            ...prevCart,
            tickets:
                prevCart.tickets?.filter((t) => t.seatId !== ticket.seatId) ||
                [],
        }));
        changeTotalPrice(getTicketPrice(ticket.ticketTypeId), false);
    };

    const getEventDetails = () => {
        if (!eventDetails) {
            return { name: "Unknown Event", dateFrom: null, dateTo: null };
        }

        return {
            name: eventDetails.namePub,
            dateFrom: eventDetails.dateFrom,
            dateTo: eventDetails.dateTo,
        };
    };

    const getTicketTypeName = (ticketTypeId: string): string => {
        const ticketType = tickets?.ticketTypes.find(
            (type) => type.id === ticketTypeId
        );
        return ticketType ? ticketType.name : "Unknown Type";
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                isTicketInCart,
                addTicketToCart,
                removeTicketFromCart,
                totalPrice,
                setTotalPrice,
                changeTotalPrice,
                currency,
                setCurrency,
                getTotalTickets,
                tickets,
                setTickets,
                getTicketPrice,
                getTicketRow,
                getTicketPlace,
                getEventDetails,
                setEventDetails,
                getTicketTypeName,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCartContext must be used within a CartProvider");
    }
    return context;
};
