import { Button } from "@/components/ui/button.tsx";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { useCart } from "@/hooks/useCart";
import { ISeat } from "@/types/types";
import React from "react";

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
    seatRow: number;
    seat: ISeat;
    setSelectedSeat: React.Dispatch<React.SetStateAction<string>>;
    getTicketType: (ticketType: string) => string;
    getTicketPrice: (ticketType: string) => number | null;
    currency: string;
}

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>(
    (
        {
            seatRow,
            seat,
            setSelectedSeat,
            getTicketType,
            getTicketPrice,
            currency,
            ...props
        },
        ref
    ) => {
        const { isTicketInCart, addTicketToCart, removeTicketFromCart } =
            useCart();

        const isInCart = isTicketInCart(seat.seatId);
        const { changeTotalPrice } = useCart();
        const price = getTicketPrice(seat.ticketTypeId);

        /* shows selected seat */
        const handleOpenChange = (open: boolean) => {
            if (!open) {
                setSelectedSeat("");
            } else setSelectedSeat(seat.seatId);
        };

        return (
            <Popover onOpenChange={handleOpenChange}>
                <PopoverTrigger>
                    <div className={props.className} ref={ref}>
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
                                Row:
                            </span>
                            <span className="font-semibold">{` ${seatRow}`}</span>
                            ,
                            <span className="text-sm font-medium text-gray-600">
                                {" "}
                                Seat:
                            </span>
                            <span className="font-semibold">{` ${seat.place}`}</span>
                        </div>

                        <div className="text-lg font-bold text-green-600">
                            {`${price} ${currency.toUpperCase()}`}
                        </div>

                        <footer className="flex flex-col">
                            {isInCart ? (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => {
                                        removeTicketFromCart({
                                            ticketTypeId: seat.ticketTypeId,
                                            seatId: seat.seatId,
                                        });
                                        price && changeTotalPrice(price, false);
                                    }}
                                >
                                    Remove from cart
                                </Button>
                            ) : (
                                <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => {
                                        addTicketToCart({
                                            ticketTypeId: seat.ticketTypeId,
                                            seatId: seat.seatId,
                                        });
                                        price && changeTotalPrice(price, true);
                                    }}
                                >
                                    Add to cart
                                </Button>
                            )}
                        </footer>
                    </div>
                </PopoverContent>
            </Popover>
        );
    }
);
