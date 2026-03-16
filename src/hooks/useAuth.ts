// src/hooks/useAuth.ts
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthService } from '@/services/auth.service';
import { useAuthActions } from '@/store/useAuthStore';
import { toast } from 'sonner';
import type { LoginCredentials } from '@/types/authTypes';

export const useAuth = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setAuth, clearAuth } = useAuthActions(); // Usando tu selector optimizado
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (credentials: LoginCredentials) => {
        setIsSubmitting(true);
        try {
            const response = await AuthService.login(credentials);

            setAuth(response.user);

            const from = location.state?.from?.pathname || '/dashboard';
            navigate(from, { replace: true });

            toast.success(`Bienvenido, ${response.user.nombre}`);
        } catch (error: any) {
           
            console.error('Login Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogout = async () => {
        try {
            await AuthService.logout(); 
        } catch (error) {
            console.error('Logout error silenciado');
        } finally {
            clearAuth();
            navigate('/login', { replace: true });
            toast.info('Sesión cerrada correctamente');
        }
    };

    return {
        handleLogin,
        handleLogout,
        isSubmitting
    };
};