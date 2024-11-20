import { Button } from "@/components/ui/button.tsx";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { useCartContext } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ISeat } from "@/types/types";
import React from "react";

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
    seat: ISeat;
    setSelectedSeat: React.Dispatch<React.SetStateAction<string>>;
    getTicketType: (ticketType: string) => string;
}

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>(
    ({ seat, setSelectedSeat, getTicketType, ...props }, ref) => {
        const { messages } = useLanguage();
        const {
            isTicketInCart,
            addTicketToCart,
            removeTicketFromCart,
            getTicketPrice,
            getTicketPlace,
            getTicketRow,
            currency,
        } = useCartContext();

        /* shows selected seat */
        const handleOpenChange = (open: boolean) => {
            if (!open) {
                setSelectedSeat("");
            } else setSelectedSeat(seat.seatId);
        };

        return (
            <Popover onOpenChange={handleOpenChange}>
                <PopoverTrigger>
                    <div className={`${props.className} `} ref={ref}>
                        {seat.place}
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="flex flex-col gap-3">
                        <div className="text-l font-semibold text-gray-800 m-0">
                            {getTicketType(seat.ticketTypeId)}
                        </div>

                        <div className="text-base text-gray-800">
                            <span className="text-sm font-medium text-gray-600">
                                {messages.cart.row}:
                            </span>
                            <span className="font-semibold">{` ${getTicketRow(
                                seat.seatId
                            )}`}</span>
                            ,
                            <span className="text-sm font-medium text-gray-600">
                                {" "}
                                {messages.cart.seat}:
                            </span>
                            <span className="font-semibold">{` ${getTicketPlace(
                                seat.seatId
                            )}`}</span>
                        </div>

                        <div className="text-lg font-bold text-green-600">
                            {`${getTicketPrice(seat.ticketTypeId)} ${currency}`}
                        </div>

                        <footer className="flex flex-col">
                            {isTicketInCart(seat.seatId) ? (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() =>
                                        removeTicketFromCart({
                                            ticketTypeId: seat.ticketTypeId,
                                            seatId: seat.seatId,
                                        })
                                    }
                                >
                                    {messages.cart.removeFromCart}
                                </Button>
                            ) : (
                                <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() =>
                                        addTicketToCart({
                                            ticketTypeId: seat.ticketTypeId,
                                            seatId: seat.seatId,
                                        })
                                    }
                                >
                                    {messages.cart.addToCart}
                                </Button>
                            )}
                        </footer>
                    </div>
                </PopoverContent>
            </Popover>
        );
    }
);
