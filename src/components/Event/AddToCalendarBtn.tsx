import { FC } from "react";
import { Button } from "../ui/button";

interface Props {
    name: string;
    description: string;
    dateFrom: string | Date;
    dateTo: string | Date;
    place: string;
}

const AddToCalendarBtn: FC<Props> = ({
    name,
    description,
    dateFrom,
    dateTo,
    place,
}) => {
    const formatDateForGoogleCalendar = (date: string | Date): string => {
        const d = new Date(date);
        const year = d.getUTCFullYear();
        const month = (d.getUTCMonth() + 1).toString().padStart(2, "0");
        const day = d.getUTCDate().toString().padStart(2, "0");
        const hours = d.getUTCHours().toString().padStart(2, "0");
        const minutes = d.getUTCMinutes().toString().padStart(2, "0");
        return `${year}${month}${day}T${hours}${minutes}00Z`;
    };

    const googleCalendarURL = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        name
    )}&dates=${formatDateForGoogleCalendar(
        dateFrom
    )}/${formatDateForGoogleCalendar(dateTo)}&details=${encodeURIComponent(
        description
    )}&location=${encodeURIComponent(place)}`;

    return (
        <Button variant="secondary" asChild>
            <a
                href={googleCalendarURL}
                target="_blank"
                rel="noopener noreferrer"
            >
                <span className="text-gray-500 mr-1">Remind me via</span>
                <span className="text-blue-600 font-semibold">
                    Google Calendar
                </span>
            </a>
        </Button>
    );
};

export default AddToCalendarBtn;
