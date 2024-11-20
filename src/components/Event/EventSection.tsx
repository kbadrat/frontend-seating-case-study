import { FC, useEffect } from "react";

import SeatingMap from "./SeatingMap";
import EventInfo from "./EventInfo";
import { useFetchEvent } from "@/hooks/useFetchEvent";
import { useCartContext } from "@/contexts/CartContext";
import Cart from "../Cart/Cart";
import EventSectionLouder from "../Loaders/EventSectionLouder";
import { useLanguage } from "@/contexts/LanguageContext";

const EventSection: FC = () => {
    const { messages } = useLanguage();
    const { data: event, loading, error } = useFetchEvent();
    const { setCurrency, setEventDetails } = useCartContext();

    const reloadPage = () => {
        window.location.reload();
    };

    useEffect(() => {
        if (!loading && !error && event) {
            setCurrency(event.currencyIso.toUpperCase());
            setEventDetails(event);
        }
    }, [event]);

    return (
        <main className="grow flex flex-col justify-center">
            {loading ? (
                <EventSectionLouder />
            ) : error ? (
                <div className="flex flex-col items-center gap-4 mt-10">
                    <p className="text-red-600 font-medium">{error}</p>
                    <button
                        onClick={reloadPage}
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-all"
                    >
                        {messages.eventPage.retryBtn}
                    </button>
                </div>
            ) : event ? (
                <>
                    <div className="max-w-screen-lg m-auto p-4 flex items-start grow gap-3 w-full">
                        <SeatingMap eventId={event.eventId} />
                        <EventInfo
                            name={event.namePub}
                            description={event.description}
                            dateFrom={event.dateFrom}
                            dateTo={event.dateTo}
                            image={event.headerImageUrl}
                            place={event.place}
                        />
                    </div>
                    <Cart />
                </>
            ) : null}
        </main>
    );
};

export default EventSection;
