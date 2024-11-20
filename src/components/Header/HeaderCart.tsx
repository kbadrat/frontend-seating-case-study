import { useCartContext } from "@/contexts/CartContext";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useNavigate } from "react-router-dom";

const HeaderCart: FC = () => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const {
        cart,
        totalPrice,
        currency,
        removeTicketFromCart,
        getTotalTickets,
        getTicketRow,
        getTicketPlace,
        getTicketPrice,
    } = useCartContext();

    const navigate = useNavigate();
    const handleCheckout = () => {
        setIsPopoverOpen(false);
        navigate("/cart");
    };

    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="secondary"
                    className="relative hover:bg-gray-100 px-4 py-2 rounded-lg"
                >
                    <span>Cart</span>
                    {getTotalTickets() > 0 && (
                        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
                            {getTotalTickets()}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent
                align="end"
                className="w-80 p-4 shadow-lg rounded-lg border border-gray-200 bg-white"
            >
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                        Your Cart
                    </h2>

                    {cart.tickets?.length ? (
                        <div className="space-y-3">
                            {cart.tickets.map((ticket) => (
                                <div
                                    key={ticket.seatId}
                                    className="flex justify-between items-center bg-gray-50 rounded-lg p-2 shadow-sm"
                                >
                                    <div className="text-sm text-gray-700">
                                        <span className="font-semibold text-gray-800">{`Row: ${getTicketRow(
                                            ticket.seatId
                                        )}, Seat: ${getTicketPlace(
                                            ticket.seatId
                                        )}`}</span>
                                        <br />
                                        <span className="text-gray-500">{`${getTicketPrice(
                                            ticket.ticketTypeId
                                        )} ${currency}`}</span>
                                    </div>
                                    <Button
                                        variant="link"
                                        onClick={() =>
                                            removeTicketFromCart(ticket)
                                        }
                                        className="text-xs text-red-600 font-bold hover:underline"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500">
                            <p className="text-sm">
                                It's empty here for now...
                            </p>
                        </div>
                    )}

                    {getTotalTickets() > 0 && (
                        <>
                            <div className="mt-4 border-t pt-2">
                                <div className="text-sm flex justify-between">
                                    <span className="font-medium text-gray-700">
                                        Total:
                                    </span>
                                    <span className="font-semibold text-gray-800">{`${totalPrice} ${currency}`}</span>
                                </div>
                            </div>

                            <div className="mt-4 text-center">
                                <Button
                                    variant="default"
                                    className="w-full bg-blue-500 text-white hover:bg-blue-600"
                                    onClick={handleCheckout}
                                >
                                    Go to Checkout
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default HeaderCart;
