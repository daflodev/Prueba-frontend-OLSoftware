import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useComercianteStore, useComercianteActions } from '@/store/useComercianteStore';
import { comerciantesService } from '@/services/comercianteServices';
import { descargarReporteCSV } from '@/services/reporteServices';

export const useComerciantes = (page: number = 1, limit: number = 5) => {
    const { comerciantes, totalRegistros, paginaActual, isLoading } = useComercianteStore();
    const { setData, setLoading, updateEstadoLocal, removeLocal } = useComercianteActions();

    const fetchComerciantes = useCallback(async (p: number, l: number) => {
        setLoading(true);
        try {
            const res = await comerciantesService.obtenerPaginados(p, l);

            setData(
                res.datos,          
                res.total,           
                res.pagina,          
                res.itemsPorPagina   
            );
        } catch (error) {
            toast.error("No se pudo obtener la lista de comerciantes");
        } finally {
            setLoading(false);
        }
    }, [setData, setLoading]);

    useEffect(() => {
        fetchComerciantes(page, limit);
    }, [page, limit, fetchComerciantes]);

    const toggleEstado = async (id: number, estadoActual: string) => {
        const nuevoEstado = estadoActual === 'Activo' ? 'Inactivo' : 'Activo';
        try {
            updateEstadoLocal(id, nuevoEstado);
            const res = await comerciantesService.cambiarEstado(id, nuevoEstado);
            if (!res.succeeded) {
                toast.error(res.message);
                fetchComerciantes(page, limit);
            }
        } catch (error) {
            fetchComerciantes(page, limit);
        }
    };

    const eliminar = async (id: number) => {
        try {
            const res = await comerciantesService.eliminar(id);
            if (res.succeeded) {
                removeLocal(id);
                toast.success("Comerciante eliminado");
            }
        } catch (error) {
            toast.error("Error al eliminar");
        }
    };

    const descargarReporte = async () => {
        try {
            const blob = await descargarReporteCSV();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Reporte_${new Date().toISOString().slice(0, 10)}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            toast.success('Reporte descargado');
        } catch (error) {
            toast.error('Error al generar reporte');
        }
    };

    return {
        comerciantes,
        totalRegistros,
        paginaActual,
        isLoading,
        toggleEstado,
        eliminar,
        descargarReporte,
        refetch: () => fetchComerciantes(page, limit)
    };
};