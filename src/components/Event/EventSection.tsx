import { FC } from "react";

import SeatingMap from "./SeatingMap";
import EventInfo from "./EventInfo";
import { useFetchEvent } from "@/hooks/useFetchEvent";

const EventSection: FC = () => {
    const { data: event, loading, error } = useFetchEvent();

    return (
        <main className="grow flex flex-col justify-center">
            {loading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    Loading...
                </div>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : event ? (
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
            ) : null}
        </main>
    );
};

export default EventSection;
