import axios, { type InternalAxiosRequestConfig, AxiosError } from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'sonner';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5042/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.response.use(
    (response) => {
        // Solo mostrar éxito en peticiones que no sean GET
        if (['post', 'put', 'delete'].includes(response.config.method || '')) {
            // Opcional: Podrías quitar esto si prefieres manejar el éxito en el Hook también
            toast.success('Operación realizada con éxito');
        }
        return response;
    },
    (error: AxiosError<any>) => {
        const status = error.response?.status;
        const data = error.response?.data;

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
                // IMPORTANTE: No disparamos toast.error aquí si hay un objeto "errors"
                // porque el Hook se encargará de mapearlos.
                if (!data?.errors) {
                    toast.error(data?.message || 'Error de validación');
                }
                break;

            case 500:
                toast.error('Error en el servidor. Intente más tarde.');
                break;

            default:
                toast.error(data?.message || 'Ocurrió un error inesperado');
                break;
        }

        return Promise.reject(error);
    }
);

export default axiosClient;