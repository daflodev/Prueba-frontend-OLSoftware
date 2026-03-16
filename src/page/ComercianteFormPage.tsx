import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ComercianteForm } from '@/components/organism/ComercianteForm';

export const ComercianteFormPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    return (
        <div className="w-full mx-auto p-4 md:p-8 bg-white flex flex-col gap-6">
            <div className="border-b border-gray-200 pb-3 flex items-center gap-4">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <h1 className="text-[22px] font-bold text-[#1e293b]">
                    {id ? 'Actualizar Formulario Comerciante' : 'Crear Formulario Nuevo'}
                </h1>
            </div>

            <div className="animate-in fade-in duration-500">
                <ComercianteForm id={id} />
            </div>

            <footer className="mt-4 text-center text-gray-400 text-xs">
                OL Software - Todos los derechos reservados © 2026
            </footer>
        </div>
    );
};