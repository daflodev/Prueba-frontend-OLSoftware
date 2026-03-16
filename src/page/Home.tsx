import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '@/store/useAuthStore';
import { useComerciantes } from '@/hooks/useComerciantes';
import { ComerciantesTable } from '@/components/organism/ComerciantesTable';
import { Pagination } from '@/components/molecules/Pagination';
import { toast } from 'sonner';

// Definimos los colores del diseño de referencia
const colors = {
    primary: '#e81f76', // Rosa de OLSoftware
    tableHeader: '#2563eb' // Azul vibrante del header
};

export const ComerciantesPage = () => {
    const user = useAuthUser();
    const navigate = useNavigate();
    const esAdmin = user?.rol === 'Administrador';

    // Estados locales para la paginación dinámica
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10); // Iniciamos en 10 según diseño

    // Consumimos el hook pasando los estados para que reaccione al cambio
    const {
        totalRegistros,
        descargarReporte,
        isLoading
    } = useComerciantes(currentPage, limit);

    // Manejadores de eventos para la paginación
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setCurrentPage(1); 
    };

    return (
        <div className="w-full mx-auto p-4 md:p-8 bg-slate-50 min-h-screen flex flex-col gap-6 font-sans">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-[28px] font-bold text-slate-900">Lista Formularios Creados</h1>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/comerciante/nuevo')}
                        className="bg-[#e81f76] hover:bg-[#c81965] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-md active:scale-95"
                    >
                        + Crear Formulario Nuevo
                    </button>

                    {esAdmin && (
                        <button
                            onClick={descargarReporte}
                            className="bg-white text-[#e81f76] border-2 border-[#e81f76] hover:bg-pink-50 px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm active:scale-95"
                        >
                            Descargar Reporte en CSV
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col mt-2">

                <ComerciantesTable />

                <div className="p-4 bg-slate-50 border-t border-gray-100 mt-auto">
                    <Pagination
                        totalItems={totalRegistros}
                        itemsPerPage={limit}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        onLimitChange={handleLimitChange}
                    />
                </div>
            </div>

            {isLoading && (
                <div className="fixed inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e81f76]"></div>
                </div>
            )}
        </div>
    );
};