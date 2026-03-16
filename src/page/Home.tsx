import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '@/store/useAuthStore';
import { useComerciantes } from '@/hooks/useComerciantes';
import { ComerciantesTable } from '@/components/organism/ComerciantesTable';
import { Pagination } from '@/components/molecules/Pagination';
import { toast } from 'sonner';

const colors = {
    primary: '#e81f76', 
    tableHeader: '#2563eb' 
};

export const ComerciantesPage = () => {
    const user = useAuthUser();
    const navigate = useNavigate();
    const esAdmin = user?.rol === 'Administrador';

    
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10); 

    
    const {
        totalRegistros,
        descargarReporte,
        isLoading
    } = useComerciantes(currentPage, limit);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setCurrentPage(1);
    };

    return (
        <div className="w-full h-full p-4 md:px-10 md:py-4 flex flex-col gap-4 font-sans overflow-hidden bg-[#f4f6fc]">

           
            <div className="flex justify-end w-full">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/comerciante/nuevo')} className="bg-[#e81f76] text-white px-5 py-2 rounded-lg font-bold text-sm shadow-md transition-all active:scale-95">
                        + Crear Formulario Nuevo
                    </button>
                    {esAdmin && (
                        <button onClick={descargarReporte} className="bg-white text-[#e81f76] border-2 border-[#e81f76] px-5 py-2 rounded-lg font-bold text-sm">
                            Descargar Reporte en CSV
                        </button>
                    )}
                </div>
            </div>

           
            <div className="flex-1 overflow-hidden">
                <ComerciantesTable />
            </div>

         
            <div className="py-2 shrink-0">
                <Pagination
                    totalItems={totalRegistros}
                    itemsPerPage={limit}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    onLimitChange={handleLimitChange}
                />
            </div>
        </div>
    );
};