import { FC } from "react";
import AddToCalendarBtn from "./AddToCalendarBtn";
import { dateFormat } from "@/services/dateFormat";

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

    return (
        <aside className="w-full max-w-sm bg-white rounded-md shadow-sm p-3 flex flex-col gap-2">
            {/* event date */}
            <p>{`${dateFromFormatted} - ${dateToFormatted}`}</p>
            {/* event address */}
            <p>{place}</p>
            {/* event header image */}
            <img
                src={image}
                alt={name}
                className="rounded-md h-auto w-full object-cover"
            />
            {/* event name */}
            <h1 className="text-xl text-zinc-900 font-semibold">{name}</h1>
            {/* event description */}
            <p className="text-sm text-zinc-500">{description}</p>
            {/* add to calendar button */}
            <AddToCalendarBtn />
        </aside>
    );
};

export default EventInfo;
