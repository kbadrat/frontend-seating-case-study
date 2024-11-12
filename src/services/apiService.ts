import { IEvent } from '@/types/types';
import axios from 'axios';

const API_BASE_URL = "https://nfctron-frontend-seating-case-study-2024.vercel.app";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

function handleApiError(error: any) {
    console.error("API Error:", error);
    throw error;
  }

export async function fetchEvent(): Promise<IEvent | null>  {
    try{
        const response = await apiClient.get<IEvent>('/event');
        return response.data;
    } catch (error){
        handleApiError(error);
        return null;
    }
}





export default apiClient;