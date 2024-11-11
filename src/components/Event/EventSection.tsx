import { FC } from "react";

import SeatingMap from "./SeatingMap";
import EventInfo from "./EventInfo";

const EventSection: FC = () => {
    return (
        <main className="grow flex flex-col justify-center">
            <div className="max-w-screen-lg m-auto p-4 flex items-start grow gap-3 w-full">
                <SeatingMap />
                <EventInfo />
            </div>
        </main>
    );
};

export default EventSection;
