import { apiClient, handleApiError } from "@/services/apiService";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export type UseApiOptions = {
    method?: "GET" | "POST";
    data?: any;
    headers?: Record<string, string>;
};

export function useApi<T>(url: string, options: UseApiOptions = { method: "GET" }) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchData = async () =>{
            setLoading(true);
            setError(null);

            try{
                const response = await apiClient.request<T>({
                    url,
                    method: options.method,
                    headers: options.headers,
                    data: options.data,
                });
                setData(response.data);
            }  catch (error){
                handleApiError(error);
                setError((error as AxiosError).message || "Unknown error");
            } finally{
                setLoading(false);
            }
        }

        fetchData();
    },[]) //url

    return {data, loading, error};
}