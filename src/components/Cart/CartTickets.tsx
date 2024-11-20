import { useCartContext } from "@/contexts/CartContext";
import { FC } from "react";
import { Button } from "../ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const CartTickets: FC = () => {
    const { messages } = useLanguage();
    const {
        cart,
        removeTicketFromCart,

        currency,

        getTicketPrice,
        getTicketPlace,
        getTicketRow,

        getTicketTypeName,
    } = useCartContext();

    return (
        <section className="space-y-6">
            {cart.tickets &&
                cart.tickets.map((ticket) => {
                    const ticketPrice = getTicketPrice(ticket.ticketTypeId);
                    const ticketRow = getTicketRow(ticket.seatId);
                    const ticketPlace = getTicketPlace(ticket.seatId);
                    const ticketType = getTicketTypeName(ticket.ticketTypeId);

                    return (
                        <div
                            key={ticket.seatId}
                            className="flex items-center justify-between bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex flex-col space-y-2">
                                {/* Ticket Type */}
                                <p className="text-xl font-semibold">
                                    {ticketType}
                                </p>
                                {/* Ticket Seat Details */}
                                <p className="text-gray-600 ">
                                    {messages.cart.row} {ticketRow},{" "}
                                    {messages.cart.seat} {ticketPlace}
                                </p>
                                {/* Ticket Price */}
                                <p className="text-gray-600 mt-2">
                                    {messages.cart.price}:{" "}
                                    <span className="font-bold text-indigo-700">
                                        {ticketPrice} {currency}
                                    </span>
                                </p>
                            </div>
                            {/* Remove Ticket Button */}
                            <Button
                                variant="destructive"
                                size="sm"
                                className="ml-4"
                                onClick={() => removeTicketFromCart(ticket)}
                            >
                                {messages.cart.remove}
                            </Button>
                        </div>
                    );
                })}
        </section>
    );
};

export default CartTickets;
