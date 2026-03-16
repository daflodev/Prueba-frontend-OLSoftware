export type EstadoComerciante = 'Activo' | 'Inactivo';

export interface Establecimiento {
    establecimientoId: number;
    nombre: string;
    ingresos: number;
    numeroEmpleados: number;
}

export interface Comerciante {
    comercianteId: number;
    nombreRazonSocial: string;
    municipioId: number;
    municipio: string;
    telefono?: string;
    correoElectronico?: string;
    fechaRegistro: string;
    estado: EstadoComerciante;
    cantidadEstablecimientos: number;
    establecimientos: Establecimiento[];
}

export interface Municipio {
    id: number;
    nombre: string;
    departamento: string; 
}


export interface ApiResponse<T> {
    succeeded: boolean;
    message: string;
    data: T;
}

export interface PaginatedResponse<T> {
    total: number;
    pagina: number;
    itemsPorPagina: number; 
    datos: T[];
}