import { FC, useState } from "react";
import AddToCalendarBtn from "./AddToCalendarBtn";
import { dateFormat } from "@/services/dateFormat";
import CalendarIcon from "../../public/calendar.svg";
import LocationIcon from "../../public/location.svg";

interface Props {
    name: string;
    description: string;
    dateFrom: string | Date;
    dateTo: string | Date;
    image: string;
    place: string;
}

const EventInfo: FC<Props> = ({
    name,
    description,
    dateFrom,
    dateTo,
    image,
    place,
}) => {
    const [dateFromFormatted, dateToFormatted] = dateFormat(dateFrom, dateTo);
    const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

    const toggleDescription = () => {
        setDescriptionExpanded(!isDescriptionExpanded);
    };

    // Shortened description for preview
    const shortDescription = description.slice(0, 150) + "...";

    return (
        <aside className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4">
            {/* Event Image */}
            <img
                src={image}
                alt={name}
                className="rounded-lg w-full h-56 object-cover shadow-md"
            />

            {/* Event Name */}
            <h1 className="text-2xl text-gray-900 font-semibold mt-2">
                {name}
            </h1>

            {/* Event Description */}
            <div className="text-sm text-gray-600 mt-1">
                <p className={`${isDescriptionExpanded ? "" : "line-clamp-3"}`}>
                    {isDescriptionExpanded ? description : shortDescription}
                </p>
                {/* Toggle button for expanding the description */}
                <button
                    onClick={toggleDescription}
                    className="text-sm text-blue-600 mt-2 font-medium"
                >
                    {isDescriptionExpanded ? "Show less" : "Read more"}
                </button>
            </div>
            {/* Event Address */}
            <div className="flex items-center text-sm text-gray-600 font-medium">
                <img
                    src={LocationIcon}
                    alt="Location Icon"
                    className="w-4 h-4 mr-2"
                />
                <span>{place}</span>
            </div>

            {/* Add to Calendar Button */}
            <div className="mt-2 ml-auto">
                <AddToCalendarBtn
                    name={name}
                    description={description}
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    place={place}
                />
            </div>
        </aside>
    );
};

export default EventInfo;
