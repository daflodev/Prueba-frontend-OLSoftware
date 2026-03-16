import { create } from 'zustand';
import type { Comerciante, Municipio } from '@/types/comerciante';

interface ComercianteState {
    comerciantes: Comerciante[];
    totalRegistros: number;
    paginaActual: number;
    itemsPorPagina: number;
    isLoading: boolean;
    municipios: Municipio[];
    isSubmitting: boolean;
    nombreFormulario: string;
    totales: { ingresos: number; empleados: number };
    onSaveForm: (() => void) | null;

    actions: {
        setLoading: (loading: boolean) => void;
        setData: (datos: Comerciante[], total: number, pagina: number, items: number) => void;
        setMunicipios: (muns: Municipio[]) => void;
        setIsSubmitting: (loading: boolean) => void;
        setNombreFormulario: (nombre: string) => void;
        setTotales: (ingresos: number, empleados: number) => void;
        setOnSaveForm: (fn: (() => void) | null) => void;
        updateEstadoLocal: (id: number, nuevoEstado: string) => void;
        removeLocal: (id: number) => void;
        resetFormState: () => void;
    }
}

export const useComercianteStore = create<ComercianteState>((set) => ({
    comerciantes: [],
    totalRegistros: 0,
    paginaActual: 1,
    itemsPorPagina: 10,
    isLoading: false,
    municipios: [],
    isSubmitting: false,
    nombreFormulario: '',
    totales: { ingresos: 0, empleados: 0 },
    onSaveForm: null,

    actions: {
        setLoading: (loading) => set({ isLoading: loading }),
        setData: (datos, total, pagina, items) => set({
            comerciantes: datos, totalRegistros: total, paginaActual: pagina, itemsPorPagina: items, isLoading: false
        }),
        setMunicipios: (muns) => set({ municipios: muns || [] }),
        setIsSubmitting: (loading) => set({ isSubmitting: loading }),
        setNombreFormulario: (nombre) => set({ nombreFormulario: nombre || '' }),
        setTotales: (ingresos, empleados) => set({ totales: { ingresos, empleados } }),
        setOnSaveForm: (fn) => set({ onSaveForm: fn }),
        updateEstadoLocal: (id, nuevoEstado) => set((state) => ({
            comerciantes: state.comerciantes.map(c =>
                c.comercianteId === id ? { ...c, estado: nuevoEstado as any } : c
            )
        })),
        removeLocal: (id) => set((state) => ({
            comerciantes: state.comerciantes.filter(c => c.comercianteId !== id),
            totalRegistros: Math.max(0, state.totalRegistros - 1)
        })),
        resetFormState: () => set({
            nombreFormulario: '', totales: { ingresos: 0, empleados: 0 }, onSaveForm: null, isSubmitting: false
        })
    }
}));

export const useComercianteActions = () => useComercianteStore(s => s.actions);