
import axios, { type InternalAxiosRequestConfig, AxiosError } from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'sonner';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5042/api',
    withCredentials: true, // Crucial para Cookies con .NET
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor de Petición (Request)
axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor de Respuesta (Response)
axiosClient.interceptors.response.use(
    (response) => {
        if (['post', 'put', 'delete'].includes(response.config.method || '')) {
            toast.success('Operación realizada con éxito');
        }
        return response;
    },
    (error: AxiosError<{ message?: string }>) => {
        const status = error.response?.status;
        const errorMessage = error.response?.data?.message || 'Ocurrió un error inesperado';

        switch (status) {
            case 401:
                toast.error('Sesión expirada. Inicie sesión nuevamente.');
                useAuthStore.getState().actions.clearAuth();
                if (!window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                }
                break;

            case 403:
                toast.error('No tienes permisos para realizar esta acción');
                break;

            case 400:
                toast.error(`Error de validación: ${errorMessage}`);
                break;

            case 500:
                toast.error('Error en el servidor. Intente más tarde.');
                break;

            default:
                toast.error(errorMessage);
                break;
        }

        return Promise.reject(error);
    }
);

export default axiosClient;