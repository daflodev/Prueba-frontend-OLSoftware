import React, { useMemo, useState } from 'react';
import { Table, type ColumnDef } from '../molecules/Table';
import { useComerciantes } from '@/hooks/useComerciantes';
import { CircleCheck, CircleX, Download, Trash2, Edit } from 'lucide-react';
import type { Comerciante } from '@/types/comerciante';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '@/store/useAuthStore';
import { ShowConfirm } from '../molecules/ShowConfrim';

const StatusBadge = ({ estado }: { estado: string }) => {
    const isActivo = estado === 'Activo';
    return (
        <span className={`px-4 py-1 rounded-full text-[11px] font-bold border transition-colors ${isActivo
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
        { header: 'Razón Social', accessorKey: 'nombreRazonSocial' },
        { header: 'Teléfono', accessorKey: 'telefono' },
        { header: 'Correo Electrónico', accessorKey: 'correoElectronico' },
        {
            header: 'Fecha Registro',
            cell: (item) => <span className="text-slate-500">{new Date(item.fechaRegistro).toLocaleDateString('es-CO')}</span>
        },
        {
            header: 'No. Establecimientos',
            cell: (item) => <div className="text-center font-medium">{item.cantidadEstablecimientos}</div>
        },
        {
            header: 'Estado',
            cell: (item) => <div className="flex justify-center"><StatusBadge estado={item.estado} /></div>
        },
        {
            header: 'Acciones',
            cell: (comerciante) => (
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={() => navigate(`/comerciante/editar/${comerciante.comercianteId}`)}
                        className="text-orange-400 hover:scale-110 transition-transform"
                    >
                        <Edit size={20} strokeWidth={2.5} />
                    </button>

                    <button
                        onClick={() => toggleEstado(comerciante.comercianteId, comerciante.estado)}
                        className="transition-transform hover:scale-110 shadow-sm rounded-full"
                    >
                        {comerciante.estado === 'Activo' ? (
                            <CircleX size={22} color='white' className='bg-red-500 rounded-full' />
                        ) : (
                            <CircleCheck size={22} color='white' className='bg-green-500 rounded-full' />
                        )}
                    </button>

                    {esAdmin && (
                        <button
                            onClick={() => setConfirmData({
                                id: comerciante.comercianteId,
                                name: comerciante.nombreRazonSocial
                            })}
                            className="text-slate-400 hover:text-red-600 transition-colors"
                        >
                            <Trash2 size={20} />
                        </button>
                    )}
                    {esAdmin && (
                        <button
                            onClick={() => descargarReporte()}
                            className="text-slate-400 hover:text-blue-600 transition-colors"
                            title="Descargar Reporte"
                        >
                            <Download size={20} />
                        </button>
                    )}
                </div>
            )
        }
    ], [esAdmin, toggleEstado, navigate]);

    return (
        <>
            <div className="w-full overflow-hidden flex flex-col">
                <Table<Comerciante>
                    data={comerciantes}
                    columns={columns}
                    isLoading={isLoading}
                    headerClassName="bg-[#58a9ff] text-white font-bold text-sm py-3"
                    rowClassName="hover:bg-blue-50/50 transition-colors border-b border-slate-100 odd:bg-white even:bg-slate-50/80"
                />
            </div>

            <ShowConfirm
                isOpen={!!confirmData}
                title="Eliminar Comerciante"
                message={`¿Estás seguro de que deseas eliminar a "${confirmData?.name}"? Esta acción no se puede deshacer.`}
                confirmText="Sí, eliminar"
                cancelText="No, cancelar"
                onConfirm={() => {
                    if (confirmData) {
                        eliminar(confirmData.id);
                        setConfirmData(null);
                    }
                }}
                onCancel={() => setConfirmData(null)}
            />
        </>
    );
};