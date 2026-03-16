import axiosClient from '@/api/axioConfig';
import type { ApiResponse, PaginatedResponse, Comerciante, Municipio } from "@/types/comerciante";

export const comerciantesService = {
    obtenerPaginados: async (page: number, limit: number) => {
        const { data } = await axiosClient.get(`/Comerciantes?page=${page}&limit=${limit}`);
        return data.data;
    },

    obtenerPorId: async (id: number) => {
        const { data } = await axiosClient.get<ApiResponse<Comerciante>>(`/Comerciantes/${id}`);
        return data;
    },

    crear: async (payload: any) => {
        return await axiosClient.post<ApiResponse<number>>('/Comerciantes', payload);
    },

    actualizar: async (id: number, payload: any) => {
        return await axiosClient.put<ApiResponse<boolean>>(`/Comerciantes/${id}`, payload);
    },

    cambiarEstado: async (id: number, nuevoEstado: string) => {
        const { data } = await axiosClient.patch<ApiResponse<boolean>>(
            `/Comerciantes/${id}/estado`,
            JSON.stringify(nuevoEstado),
            { headers: { 'Content-Type': 'application/json' } }
        );
        return data;
    },

    eliminar: async (id: number) => {
        const { data } = await axiosClient.delete<ApiResponse<boolean>>(`/Comerciantes/${id}`);
        return data;
    },

    obtenerMunicipios: async () => {
        const { data } = await axiosClient.get<ApiResponse<Municipio[]>>('/Municipios');
        return data.data;
    },

    descargarReporte: async () => {
        const response = await axiosClient.get('/Reportes/comerciantes-activos', { responseType: 'blob' });
        return response.data;
    }
};