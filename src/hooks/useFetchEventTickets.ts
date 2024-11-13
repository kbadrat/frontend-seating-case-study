import { IEventTicketsResponse } from "@/types/types";
import { useApi } from "./useApi";

export function useFetchEventTickets(eventId: string){
    const url = `/event-tickets?eventId=${eventId}`;
    return useApi<IEventTicketsResponse>(url);
}