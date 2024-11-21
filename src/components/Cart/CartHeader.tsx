import { useLanguage } from "@/contexts/LanguageContext";
import { dateFormat } from "@/services/dateFormat";
import { IEvent } from "@/types/types";
import { FC } from "react";

interface Props {
    getTotalTickets: () => number;
    event: IEvent;
}

const CartHeader: FC<Props> = ({ getTotalTickets, event }) => {
    const { messages } = useLanguage();
    const eventStartDate = event.dateFrom
        ? new Date(event.dateFrom)
        : new Date();
    const eventEndDate = event.dateTo ? new Date(event.dateTo) : new Date();

    const [formattedStartDate] = dateFormat(eventStartDate, eventEndDate);

    return (
        <header className="bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-700 text-white py-10">
            <div className="max-w-screen-lg mx-auto px-6">
                <h1 className="text-4xl font-extrabold tracking-tight">
                    {messages.cart.yourCart}
                </h1>
                <p className="text-lg mt-3">
                    <span className="font-bold text-2xl">
                        {getTotalTickets()}
                    </span>{" "}
                    {messages.cart.ticketsSelected}{" "}
                    <span className="font-bold text-xl">
                        {event.namePub || "Unknown Event"}
                    </span>
                    .
                </p>
                <p className="mt-4 text-lg">{formattedStartDate}</p>
            </div>
        </header>
    );
};

export default CartHeader;
