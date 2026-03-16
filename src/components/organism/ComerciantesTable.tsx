import React, { useMemo, useState } from 'react';
import { Table, type ColumnDef } from '../molecules/Table';
import { useComerciantes } from '@/hooks/useComerciantes';
import { CircleCheck, CircleX, Download, Trash2, Edit } from 'lucide-react'; // Íconos coloridos
import type { Comerciante } from '@/types/comerciante';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '@/store/useAuthStore';
const StatusBadge = ({ estado }: { estado: string }) => {
    const isActivo = estado === 'Activo';
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${isActivo
            ? 'border-green-500 text-green-600 bg-white'
            : 'border-red-500 text-red-500 bg-white'
            }`}>
            {estado}
        </span>
    );
};
export const ComerciantesTable = () => {

    
    const user = useAuthUser();
    const navigate = useNavigate();

    const esAdmin = user?.rol === 'Administrador';
    const { comerciantes, isLoading, toggleEstado, eliminar, descargarReporte } = useComerciantes();
    const [confirmData, setConfirmData] = useState<{ id: number; name: string } | null>(null);

    const columns = useMemo<ColumnDef<Comerciante>[]>(() => [
        {
            header: 'Razón Social',
            accessorKey: 'nombreRazonSocial'
        },
        {
            header: 'Teléfono',
            accessorKey: 'telefono'
        },
        {
            header: 'Correo Electrónico',
            accessorKey: 'correoElectronico'
        },
        {
            header: 'Fecha Registro',
            cell: (item) => new Date(item.fechaRegistro).toLocaleDateString('es-CO')
        },
        {
            header: 'No. Establecimientos',
            accessorKey: 'cantidadEstablecimientos'
        },
        {
            header: 'Estado',
            cell: (item) => <StatusBadge estado={item.estado} />
        },
        {
            header: 'Acciones',
            cell: (comerciante) => (
                <div className="flex items-center justify-center gap-3">

                    <button
                        onClick={() => navigate(`/comerciante/editar/${comerciante.comercianteId}`)}
                        className="hover:scale-110 transition-transform w-6 h-6 flex items-center justify-center"
                        title="Editar Comerciante"
                    >
                        <Edit/>
                    </button>

                    <button
                        onClick={() => toggleEstado(comerciante.comercianteId, comerciante.estado)}
                        className="hover:scale-110 transition-transform"
                        title={comerciante.estado === 'Activo' ? 'Inactivar' : 'Activar'}
                    >
                        {comerciante.estado === 'Activo' ? (
                            <CircleX size={24} color='white' className='bg-red-500 rounded-full shadow-sm' />
                        ) : (
                            <CircleCheck size={24} color='white' className='bg-green-500 rounded-full shadow-sm' />
                        )}
                    </button>

                    {esAdmin && (
                        <button
                            onClick={() => setConfirmData({
                                id: comerciante.comercianteId,
                                name: comerciante.nombreRazonSocial
                            })}
                            className="text-gray-500 hover:text-red-600 transition-colors"
                        >
                            <Trash2 size={22} />
                        </button>
                    )}

                    {esAdmin ? <button
                        onClick={() => descargarReporte()}
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                        title="Descargar Reporte CSV"
                    >
                        <Download size={22} strokeWidth={2} />
                    </button> : ""}

                </div>
            )
        }
    ], [esAdmin, toggleEstado, eliminar, descargarReporte, navigate]);

    return (
        <Table<Comerciante>
            data={comerciantes}
            columns={columns}
            isLoading={isLoading}
        />
    );
};