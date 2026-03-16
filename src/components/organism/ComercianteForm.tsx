import { useComercianteForm } from '@/hooks/useComercianteForm';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';

interface ComercianteFormProps {
    id?: string;
}

export const ComercianteForm = ({ id }: ComercianteFormProps) => {
    const {
        register,
        errors,
        onSubmit,
        municipios,
        departamentos,
        totales,
        isEditing,
        isSubmitting,
        deptoSeleccionado
    } = useComercianteForm(id);

    return (
        <form
            onSubmit={onSubmit}
            className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden animate-in fade-in duration-500"
        >
            <div className="p-8">
                <h3 className="text-lg font-bold text-blue-900 mb-8 border-b pb-2 flex items-center gap-2">
                    <span className="w-2 h-6 bg-pink-500 rounded-full inline-block"></span>
                    Datos Generales
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">

                    <div className="space-y-4">
                        <Input
                            label="Nombre o Razón Social *"
                            placeholder="Ej: OL Software S.A.S"
                            error={errors.nombreRazonSocial?.message}
                            {...register("nombreRazonSocial", {
                                required: "La razón social es obligatoria",
                                maxLength: { value: 50, message: "Máximo 50 caracteres" }
                            })}
                        />

                        <Select
                            label="Departamento *"
                            options={departamentos.map(d => ({ value: d, label: d }))}
                            error={errors.departamento?.message}
                            {...register("departamento", { required: "Seleccione un departamento" })}
                        />

                        <Select
                            label="Municipio / Ciudad *"
                            disabled={!deptoSeleccionado}
                            options={municipios.map(m => ({ value: m.id, label: m.nombre }))}
                            error={errors.municipioId?.message}
                            {...register("municipioId", { required: "Seleccione un municipio" })}
                        />
                    </div>

                    <div className="space-y-4">
                        <Input
                            label="Teléfono"
                            type="tel"
                            placeholder="Opcional"
                            error={errors.telefono?.message}
                            {...register("telefono", {
                                pattern: { value: /^[0-9+ ]+$/, message: "Solo números y símbolo +" }
                            })}
                        />

                        <Input
                            label="Correo Electrónico"
                            type="email"
                            placeholder="usuario@ejemplo.com"
                            error={errors.correoElectronico?.message}
                            {...register("correoElectronico", {
                                pattern: { value: /^\S+@\S+\.\S+$/, message: "Formato de email inválido" }
                            })}
                        />

                        <Input
                            label="Fecha de Registro *"
                            type="date"
                            error={errors.fechaRegistro?.message}
                            {...register("fechaRegistro", { required: "La fecha es obligatoria" })}
                        />

                        <div className="flex items-center gap-3 mt-8 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <input
                                type="checkbox"
                                id="poseeEst"
                                className="w-5 h-5 text-pink-600 rounded border-gray-300 focus:ring-pink-500 cursor-pointer"
                                {...register("poseeEstablecimientos")}
                            />
                            <label htmlFor="poseeEst" className="text-sm font-bold text-gray-700 cursor-pointer select-none">
                                ¿Posee establecimientos asociados?
                            </label>
                        </div>
                    </div>
                </div>

                {isEditing ? (
                    <div className="mt-12 bg-[#002855] text-white p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl">
                        <div className="flex flex-wrap gap-12">
                            <div className="space-y-1">
                                <p className="text-blue-300 text-[10px] font-black uppercase tracking-[2px]">Total Ingresos Formulario:</p>
                                <p className="text-4xl font-black tabular-nums">
                                    ${new Intl.NumberFormat('es-CO').format(totales.ingresos)}
                                </p>
                            </div>
                            <div className="border-l border-blue-800 pl-12 space-y-1">
                                <p className="text-blue-300 text-[10px] font-black uppercase tracking-[2px]">Cantidad de empleados:</p>
                                <p className="text-4xl font-black tabular-nums">{totales.empleados}</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                            <p className="text-xs text-blue-200 italic">Los totales se calculan de la data semilla</p>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#E91E63] hover:bg-[#C81965] text-white px-12 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-pink-500/20 active:scale-95 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Procesando...' : 'Actualizar Información'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#E91E63] hover:bg-[#C81965] text-white px-10 py-3 rounded-lg font-bold shadow-md transition-all active:scale-95 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Guardando...' : 'Crear Nuevo Registro'}
                        </button>
                    </div>
                )}
            </div>
        </form>
    );
};