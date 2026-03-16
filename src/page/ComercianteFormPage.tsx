import { useParams } from 'react-router-dom';
import { ComercianteForm } from '@/components/organism/ComercianteForm';
import { FormLayout } from '@/components/templates/FormLayout';
import { useComercianteForm } from '@/hooks/useComercianteForm';

export const ComercianteFormPage = () => {
    const { id } = useParams<{ id: string }>();

    const formLogic = useComercianteForm(id);

    const nombreEmpresa = formLogic.watch("nombreRazonSocial");

    return (
        <FormLayout
            title={nombreEmpresa || (id ? "Actualizar Formulario" : "Crear Formulario Nuevo")}
            totalIngresos={formLogic.totales.ingresos}
            totalEmpleados={formLogic.totales.empleados}
            onSave={formLogic.onSubmit} 
            isSubmitting={formLogic.isSubmitting}
        >
            
            <div className="animate-in fade-in duration-500">
                <ComercianteForm
                    formLogic={formLogic} 
                />
            </div>

            <footer className="mt-8 text-center text-gray-400 text-[10px] uppercase tracking-widest">
                OL Software - Prueba Técnica © 2026
            </footer>
        </FormLayout>
    );
};