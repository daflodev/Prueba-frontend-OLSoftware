// src/components/organism/ComercianteForm.tsx
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';

interface ComercianteFormProps {
    formLogic: any; 
}

export const ComercianteForm = ({ formLogic }: ComercianteFormProps) => {
    const {
        register,
        errors,
        municipios,
        departamentos,
        deptoSeleccionado
    } = formLogic;

    return (
        <div className="space-y-8">
            <h3 className="text-lg font-bold text-[#0a125a] mb-8 border-b pb-4 flex items-center gap-2">
                Datos Generales
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                <div className="space-y-5">
                    <Input
                        label="Nombre o Razón Social *"
                        placeholder="Ej: OL Software S.A.S"
                        error={errors.nombreRazonSocial?.message}
                        {...register("nombreRazonSocial", { required: "Campo obligatorio" })}
                    />

                    <Select
                        label="Departamento *"
                        options={departamentos.map((d: any) => ({ value: d, label: d }))}
                        error={errors.departamento?.message}
                        {...register("departamento", { required: "Seleccione uno" })}
                    />

                    <Select
                        label="Municipio / Ciudad *"
                        disabled={!deptoSeleccionado}
                        options={municipios.map((m: any) => ({ value: m.id, label: m.nombre }))}
                        error={errors.municipioId?.message}
                        {...register("municipioId", { required: "Seleccione uno" })}
                    />
                </div>

                <div className="space-y-5">
                    <Input
                        label="Teléfono"
                        type="tel"
                        placeholder="300 000 0000"
                        error={errors.telefono?.message}
                        {...register("telefono")}
                    />

                    <Input
                        label="Correo Electrónico"
                        type="email"
                        placeholder="correo@empresa.com"
                        error={errors.correoElectronico?.message}
                        {...register("correoElectronico")}
                    />

                    <Input
                        label="Fecha de Registro *"
                        type="date"
                        error={errors.fechaRegistro?.message}
                        {...register("fechaRegistro", { required: "Fecha requerida" })}
                    />

                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 mt-4">
                        <input
                            type="checkbox"
                            id="poseeEst"
                            className="w-5 h-5 text-[#e81f76] rounded border-gray-300 focus:ring-[#e81f76]"
                            {...register("poseeEstablecimientos")}
                        />
                        <label htmlFor="poseeEst" className="text-sm font-bold text-slate-700">
                            ¿Posee establecimientos asociados?
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};