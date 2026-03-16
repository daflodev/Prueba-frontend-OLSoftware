// src/services/auth.service.ts
import axiosClient from "@/api/axioConfig";
import type { User, LoginCredentials } from "@/types/authTypes";
// Asumiendo tu ApiResponse genérico
import type { ApiResponse } from "@/types/comerciante";

export const AuthService = {
    login: async (credentials: LoginCredentials) => {
        const response = await axiosClient.post<ApiResponse<{ user: User }>>('/auth/login', credentials);
        return response.data.data;
    },

    getCurrentUser: async (): Promise<User> => {
        const response = await axiosClient.get<ApiResponse<User>>('/auth/me');
        return response.data.data;
    },

    logout: async () => {
        await axiosClient.post('/auth/logout');
    }
};