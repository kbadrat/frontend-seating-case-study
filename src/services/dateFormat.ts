import { useLanguage } from "@/contexts/LanguageContext";

export function dateFormat (dateFrom: string | Date, dateTo: string | Date): string[]{
    if (typeof dateFrom === "string") dateFrom = new Date(dateFrom);
    if (typeof dateTo === "string") dateTo = new Date(dateTo);

    const {language} = useLanguage();

    const dateLanguage = language === "en" ? "en-US" : "cs-CZ";

    const dateFromFormatted = dateFrom.toLocaleString(dateLanguage, {
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "numeric",
        minute: "2-digit"
    });

    const dateToFormatted = dateTo.toLocaleString(dateLanguage, {
        hour: "numeric",
        minute: "2-digit"
    });

    return [dateFromFormatted, dateToFormatted];
};
