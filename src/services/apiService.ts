import axios from 'axios';
const API_BASE_URL = "https://nfctron-frontend-seating-case-study-2024.vercel.app";

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export function handleApiError(error: any) {
    console.error("API Error:", error);
  }

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
},
    (error) => Promise.reject(error)
);
