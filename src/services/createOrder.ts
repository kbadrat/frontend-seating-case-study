import { IOrderInput } from "@/types/types";
import { apiClient } from "./apiService";

export const createOrder = async (orderData: IOrderInput) => {
    try {
        const response = await apiClient.post("/order", orderData);
        return response.data; 
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;  
    }
};

