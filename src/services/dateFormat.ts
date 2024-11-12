export function dateFormat (dateFrom: string | Date, dateTo: string | Date): string[]{
    if (typeof dateFrom === "string") dateFrom = new Date(dateFrom);
    if (typeof dateTo === "string") dateTo = new Date(dateTo);

    const dateFromFormatted = dateFrom.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "numeric",
        minute: "2-digit"
    });

    const dateToFormatted = dateTo.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit"
    });

    return [dateFromFormatted, dateToFormatted];
};
