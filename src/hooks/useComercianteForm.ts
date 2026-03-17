import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useComercianteStore, useComercianteActions } from '@/store/useComercianteStore';
import { comerciantesService } from '@/services/comercianteServices';

export const useComercianteForm = (id?: string) => {
    const navigate = useNavigate();

    const { municipios, isSubmitting } = useComercianteStore();
    const { setMunicipios, setIsSubmitting } = useComercianteActions();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        setError,
        formState: { errors }
    } = useForm({
        defaultValues: {
            nombreRazonSocial: '',
            departamento: '',
            municipioId: '',
            telefono: '',
            correoElectronico: '',
            fechaRegistro: new Date().toISOString().split('T')[0],
            estado: 'Activo',
            poseeEstablecimientos: false,
            establecimientos: [] as any[]
        }
    });

    useEffect(() => {
        const initialize = async () => {
            try {
                const muns = await comerciantesService.obtenerMunicipios();
                setMunicipios(muns);

                if (id) {
                    const res = await comerciantesService.obtenerPorId(Number(id));
                    if (res.succeeded && res.data) {
                        const data = res.data;
                        const munInfo = muns.find(
                            (m) => m.nombre.toLowerCase() === data.municipio.toLowerCase()
                        );

                        reset({
                            ...data,
                            departamento: munInfo?.departamento || '',
                            municipioId: munInfo ? String(munInfo.id) : '',
                            fechaRegistro: data.fechaRegistro.split('T')[0],
                            establecimientos: data.establecimientos || []
                        });
                    }
                }
            } catch (error) {
                toast.error("Error al cargar la información");
            }
        };
        initialize();
    }, [id, reset, setMunicipios]);

    const deptoSeleccionado = watch("departamento");
    const listaEstablecimientos = watch("establecimientos") || [];

    const listaDepartamentos = useMemo(() => {
        const uniqueDeptos = Array.from(new Set(municipios.map(m => m.departamento)));
        return uniqueDeptos.sort();
    }, [municipios]);

    const municipiosFiltrados = useMemo(() => {
        if (!deptoSeleccionado) return [];
        return municipios.filter(m => m.departamento === deptoSeleccionado);
    }, [deptoSeleccionado, municipios]);

    const totales = useMemo(() => {
        return listaEstablecimientos.reduce((acc, est: any) => ({
            ingresos: acc.ingresos + (Number(est.ingresos) || 0),
            empleados: acc.empleados + (Number(est.numeroEmpleados) || 0)
        }), { ingresos: 0, empleados: 0 });
    }, [listaEstablecimientos]);

    useEffect(() => {
        const subscription = watch((_, { name }) => {
            if (name === 'departamento') setValue('municipioId', '');
        });
        return () => subscription.unsubscribe();
    }, [watch, setValue]);

    const onSave = async (formData: any) => {
        setIsSubmitting(true);
        try {
            const payload = {
                ...formData,
                municipioId: Number(formData.municipioId)
            };

            const response = id
                ? await comerciantesService.actualizar(Number(id), payload)
                : await comerciantesService.crear(payload);

            const result = response.data || response;

            if (result.succeeded) {
                toast.success(id ? "Actualizado correctamente" : "Creado correctamente");
                navigate('/dashboard');
            } else {
                toast.error(result.message || "Error en la operación");
            }
        } catch (error: any) {
            const apiErrors = error.response?.data?.errors;

            if (apiErrors) {
                const messages = Object.values(apiErrors).flat() as string[];

                messages.forEach(msg => toast.error(msg));

                Object.keys(apiErrors).forEach((key) => {
                    const fieldName = key.charAt(0).toLowerCase() + key.slice(1);
                    setError(fieldName as any, {
                        type: "server",
                        message: apiErrors[key][0]
                    });
                });
            } else {
                toast.error("Error crítico al conectar con el servidor");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        register,
        errors,
        onSubmit: handleSubmit(onSave),
        municipios: municipiosFiltrados,
        departamentos: listaDepartamentos,
        totales,
        isEditing: !!id,
        isSubmitting,
        deptoSeleccionado,
        watch,
        setValue,
    };
};