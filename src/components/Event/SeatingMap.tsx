import { FC, useEffect, useState } from "react";
import { Seat } from "../Seat";
import { useFetchEventTickets } from "@/hooks/useFetchEventTickets";
import { IEventTicketsResponse } from "@/types/types";
import { useCartContext } from "@/contexts/CartContext";

interface Props {
    eventId: string;
}

const SeatingMap: FC<Props> = ({ eventId }) => {
    const {
        data: fetchedTickets,
        loading,
        error,
    } = useFetchEventTickets(eventId);
    const [selectedSeat, setSelectedSeat] = useState<string>("");
    const { tickets, setTickets, isTicketInCart } = useCartContext();

    useEffect(() => {
        if (fetchedTickets) setTickets(fetchedTickets);
    }, [fetchedTickets, setTickets]);

    function normalizeSeats(tickets: IEventTicketsResponse) {
        tickets.seatRows.forEach((row) => {
            row.seats.forEach((seat, index) => {
                seat.place = index + 1;
            });
        });
    }

    if (!loading && tickets !== null) normalizeSeats(tickets);

    function getTicketType(ticketType: string): string {
        const foundType = tickets?.ticketTypes.find(
            (type) => type.id === ticketType
        );

        return foundType ? foundType.name : "Ticket";
    }

    function getSeatClassName(type: string, seatId: string): string {
        const baseClasses =
            "w-7 h-9 flex items-center justify-center text-mg font-semibold rounded-md border-2 ";

        if (isTicketInCart(seatId))
            return `${baseClasses} bg-green-400 border-gray-300 text-black hover:bg-green-700 hover:text-white transition-transform duration-200  hover:scale-105`;

        if (selectedSeat === seatId) {
            if (getTicketType(type) === "VIP ticket") {
                return `${baseClasses} bg-purple-700 border-gray-300 text-white`; // VIP get info
            } else if (getTicketType(type) === "Regular ticket") {
                return `${baseClasses} bg-blue-600 border-gray-200 text-white`; // Regular get info
            }
        }

        if (getTicketType(type) === "VIP ticket") {
            return `${baseClasses} bg-purple-400 border-gray-300 hover:bg-purple-700 text-black hover:text-white transition-transform duration-200  hover:scale-105`; // VIP
        } else if (getTicketType(type) === "Regular ticket") {
            return `${baseClasses} bg-blue-300 border-gray-200  hover:bg-blue-600 text-black hover:text-white transition-transform duration-200  hover:scale-105`; // Regular
        }

        return `${baseClasses} bg-gray-100 text-gray-300 cursor-default`; // Sold
    }

    function handleSeats(tickets: IEventTicketsResponse) {
        return tickets.seatRows.map((row) => (
            <div key={row.seatRow} className="flex items-center">
                <div className="flex-none pl-5 text-gray-800 font-medium ">
                    {row.seatRow}
                </div>

                <div className="flex-grow flex justify-center flex-wrap gap-1">
                    {row.seats.map((seat) => (
                        <Seat
                            key={seat.seatId}
                            seat={seat}
                            className={getSeatClassName(
                                seat.ticketTypeId,
                                seat.seatId
                            )}
                            setSelectedSeat={setSelectedSeat}
                            getTicketType={getTicketType}
                        />
                    ))}
                </div>
            </div>
        ));
    }

    return (
        <div
            className="bg-white rounded-md grow grid p-3 self-stretch shadow-sm gap-2"
            style={{
                // gridTemplateColumns: "repeat(auto-fill, minmax(40px, 1fr))",
                gridAutoRows: "40px",
            }}
        >
            {/*	seating map */}
            {tickets ? handleSeats(tickets) : null}
        </div>
    );
};

export default SeatingMap;
