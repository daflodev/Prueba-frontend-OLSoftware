import axiosClient from "@/api/axioConfig";

export const descargarReporteCSV = async () => {
    
    const response = await axiosClient.get('/reportes/comerciantes-activos', {
        responseType: 'blob',
    });
    return response.data;
};