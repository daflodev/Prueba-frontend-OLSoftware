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

    actions: {

        setData: (datos: Comerciante[], total: number, pagina: number, itemsPorPagina: number) => void;

        setLoading: (loading: boolean) => void;


        updateEstadoLocal: (id: number, nuevoEstado: string) => void;


        removeLocal: (id: number) => void;

        setMunicipios: (muns: Municipio[]) => void;
        setIsSubmitting: (loading: boolean) => void;
    }
}

export const useComercianteStore = create<ComercianteState>((set) => ({
    // Valores iniciales
    comerciantes: [],
    totalRegistros: 0,
    paginaActual: 1,
    itemsPorPagina: 10,
    isLoading: false,
    municipios: [],
    isSubmitting: false,

    actions: {
        setData: (datos, total, pagina, itemsPorPagina) => set({
            comerciantes: datos,
            totalRegistros: total,
            paginaActual: pagina,
            itemsPorPagina: itemsPorPagina,
            isLoading: false
        }),

        setLoading: (loading) => set({ isLoading: loading }),

        setMunicipios: (muns) => set({ municipios: muns }),

        setIsSubmitting: (loading) => set({ isSubmitting: loading }),

        updateEstadoLocal: (id, nuevoEstado) => set((state) => ({
            comerciantes: state.comerciantes.map(c =>
                c.comercianteId === id ? { ...c, estado: nuevoEstado as any } : c
            )
        })),

        removeLocal: (id) => set((state) => ({
            comerciantes: state.comerciantes.filter(c => c.comercianteId !== id),
            totalRegistros: Math.max(0, state.totalRegistros - 1)
        }))
    }
}));

export const useComercianteActions = () => useComercianteStore(s => s.actions);