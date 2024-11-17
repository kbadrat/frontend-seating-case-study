import { Button } from "@/components/ui/button.tsx";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { ISeat } from "@/types/types";
import React from "react";

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
    seatRow: number;
    seat: ISeat;
    setSelectedSeat: React.Dispatch<React.SetStateAction<string>>;
    getTicketType: (ticketType: string) => string;
}

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>(
    ({ seatRow, seat, setSelectedSeat, getTicketType, ...props }, ref) => {
        const isInCart = false;

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

                        <footer className="flex flex-col">
                            {isInCart ? (
                                <Button
                                    disabled
                                    variant="destructive"
                                    size="sm"
                                >
                                    Remove from cart
                                </Button>
                            ) : (
                                <Button disabled variant="default" size="sm">
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
