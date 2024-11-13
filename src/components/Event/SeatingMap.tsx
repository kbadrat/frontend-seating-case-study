import { FC } from "react";
import { Seat } from "../Seat";
import { useFetchEventTickets } from "@/hooks/useFetchEventTickets";
import { IEventTicketsResponse } from "@/types/types";

interface Props {
    eventId: string;
}

const SeatingMap: FC<Props> = ({ eventId }) => {
    const { data: tickets, loading, error } = useFetchEventTickets(eventId);
    // console.log(tickets);

    function normalizeSeats(tickets: IEventTicketsResponse) {
        tickets.seatRows.forEach((row) => {
            row.seats.forEach((seat, index) => {
                seat.place = index + 1;
            });
        });
    }
    if (!loading && tickets !== null) normalizeSeats(tickets);

    function handleSeats(tickets: IEventTicketsResponse) {
        console.log(tickets);

        return tickets.seatRows.map((row) => (
            <div key={row.seatRow} className="flex items-center">
                <div className="flex-none pl-5 text-gray-800 font-medium">
                    {row.seatRow}
                </div>

                <div className="flex-grow flex justify-center">
                    {row.seats.map((seat) => (
                        <Seat key={seat.seatId} seatNumber={seat.place} />
                    ))}
                </div>
            </div>
        ));
    }

    return (
        <div
            className="bg-white rounded-md grow grid p-3 self-stretch shadow-sm"
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
