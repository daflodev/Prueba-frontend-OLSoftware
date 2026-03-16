// src/types/authTypes.ts

export type RolUsuario = 'Administrador' | 'Auxiliar de Registro';

export interface User {
    id: number; 
    email: string;
    nombre: string;
    rol: RolUsuario; 
    avatarUrl?: string;
}

export interface AuthResponse {
    user: User;
}

export interface LoginCredentials {
    correoElectronico: string;
    contrasena: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    actions: {
        setAuth: (user: User) => void;
        clearAuth: () => void;
        setLoading: (status: boolean) => void;
    };
}