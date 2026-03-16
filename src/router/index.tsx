import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '@/page/LoginPage';
import { ComerciantesPage } from '@/page/Home';
import { RootLayout } from '@/components/templates/RootLayout';
import { GuestGuard, AuthGuard } from './guards/AuthGuard';
import { ComercianteFormPage } from '@/page/ComercianteFormPage';

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/login" replace />,
            },
            {
                element: <GuestGuard />,
                children: [
                    { path: '/login', element: <LoginPage /> }
                ]
            },
            {
                element: <AuthGuard />,
                children: [
                    {
                        path: '/dashboard',
                        element: <ComerciantesPage />
                    },
               
                    {
                        path: '/comerciante/nuevo',
                        element: <ComercianteFormPage />
                    },
                    {
                        path: '/comerciante/editar/:id',
                        element: <ComercianteFormPage />
                    }
                ]
            },
            {
                path: '*',
                element: <Navigate to="/login" replace />,
            }
        ]
    }
]);