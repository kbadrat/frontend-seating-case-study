import { createContext, useState, useContext, ReactNode } from "react";
import { IOrderInput, IOrderTicket } from "@/types/types";

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

    const changeTotalPrice = (value: number, increase: boolean) => {
        setTotalPrice((prevTotal) =>
            increase ? prevTotal + value : prevTotal - value
        );
    };

    const isTicketInCart = (seatId: string): boolean => {
        return cart.tickets?.some((seat) => seat.seatId === seatId) ?? false;
    };

    const addTicketToCart = (ticket: IOrderTicket) => {
        setCart((prevCart) => ({
            ...prevCart,
            tickets: prevCart.tickets
                ? [...prevCart.tickets, ticket]
                : [ticket],
        }));
    };

    const removeTicketFromCart = (ticket: IOrderTicket) => {
        setCart((prevCart) => ({
            ...prevCart,
            tickets:
                prevCart.tickets?.filter((t) => t.seatId !== ticket.seatId) ||
                [],
        }));
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
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
