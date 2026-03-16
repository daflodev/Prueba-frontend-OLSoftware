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
                toast.error("Error al cargar la información del formulario");
                console.error(error);
            }
        };

        initialize();
    }, [id, reset, setMunicipios]);

    const deptoSeleccionado = watch("departamento");

    const listaDepartamentos = useMemo(() => {
        const uniqueDeptos = Array.from(new Set(municipios.map(m => m.departamento)));
        return uniqueDeptos.sort();
    }, [municipios]);

    const municipiosFiltrados = useMemo(() => {
        if (!deptoSeleccionado) return [];
        return municipios.filter(m => m.departamento === deptoSeleccionado);
    }, [deptoSeleccionado, municipios]);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'departamento') setValue('municipioId', '');
        });
        return () => subscription.unsubscribe();
    }, [watch, setValue]);

    const listaEstablecimientos = watch("establecimientos") || [];

    const totales = useMemo(() => {
        return listaEstablecimientos.reduce((acc, est: any) => ({
            ingresos: acc.ingresos + (Number(est.ingresos) || 0),
            empleados: acc.empleados + (Number(est.numeroEmpleados) || 0)
        }), { ingresos: 0, empleados: 0 });
    }, [listaEstablecimientos]);

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

            if (response.data.succeeded) {
                toast.success(id ? "Actualizado correctamente" : "Creado correctamente");
                navigate('/dashboard');
            } else {
                toast.error(response.data.message || "Ocurrió un error");
            }
        } catch (error) {
            toast.error("Error crítico al conectar con el servidor");
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