import type { ReactNode } from 'react';

interface FormLayoutProps {
    children: ReactNode;
    title: string;
    totalIngresos: number;
    totalEmpleados: number;
    onSave: () => void;
    isSubmitting?: boolean;
}
export const FormLayout = ({
    children,
    title,
    totalIngresos,
    totalEmpleados,
    onSave,
    isSubmitting
}: FormLayoutProps) => {
    return (
        <div className="flex flex-col h-full bg-[#dbe4fc] relative overflow-hidden">

            <div className="w-full bg-[#eaecf3] px-10 py-4 border-b border-gray-200 shadow-sm shrink-0">
                <h1 className="text-[20px] font-bold text-[#0a125a] tracking-tight">
                    {title || "Nuevo Registro"}
                </h1>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-10 pb-40 custom-scrollbar">
                <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-10">
                    {children}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 px-10 z-50">
                <footer className="max-w-7xl mx-auto bg-[#2d3a8d] text-white h-24 flex items-center px-12 rounded-t-2xl shadow-[0_-10px_25px_rgba(0,0,0,0.15)]">

                    <div className="flex gap-16 items-center border-r border-white/20 pr-16 h-full py-4">
                        <div className="flex flex-col gap-1">
                            <p className="text-[11px] uppercase font-bold text-blue-200 opacity-80 tracking-wider">Total Ingresos Formulario:</p>
                            <p className="text-3xl font-black">
                                ${new Intl.NumberFormat('es-CO').format(totalIngresos)}
                            </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-[11px] uppercase font-bold text-blue-200 opacity-80 tracking-wider">Cantidad de empleados:</p>
                            <p className="text-3xl font-black">{totalEmpleados}</p>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center justify-end gap-10 pl-10">
                        <p className="text-sm font-medium text-blue-50 opacity-90 hidden lg:block italic">
                            Si ya ingresaste todos los datos, crea tu formulario aquí
                        </p>
                        <button
                            onClick={onSave}
                            disabled={isSubmitting}
                            className="bg-[#e81f76] hover:bg-[#c81965] text-white px-12 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-50 whitespace-nowrap"
                        >
                            {isSubmitting ? 'Procesando...' : 'Enviar Formulario'}
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
};