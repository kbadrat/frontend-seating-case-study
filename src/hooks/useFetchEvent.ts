import { IEvent } from "@/types/types";
import { useApi } from "./useApi";

export function useFetchEvent(){
    return useApi<IEvent>("/event");
}