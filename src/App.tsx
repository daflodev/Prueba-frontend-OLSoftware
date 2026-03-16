import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { router } from './router';
import { useEffect } from 'react';
import { useAuthActions, useAuthStore } from './store/useAuthStore';
import { AuthService } from './services/auth.service';

export const App = () => {
    const { setAuth, clearAuth } = useAuthActions();

    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    useEffect(() => {
        const silentCheck = async () => {
            if (isAuthenticated) {
                try {
                    const user = await AuthService.getCurrentUser();
                    setAuth(user);
                } catch (error) {
                    clearAuth();
                }
            }
        };

        silentCheck();
    }, [isAuthenticated, setAuth, clearAuth]);

    return (
        <>
            <Toaster
                richColors
                position="top-right"
                expand={false}
                closeButton
            />
            <RouterProvider router={router} />
        </>
    );
};