import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';


export const AuthGuard = () => {
    const isAuth = useAuthStore((s) => s.isAuthenticated);
    const location = useLocation();

    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};


export const GuestGuard = () => {
    const isAuth = useAuthStore((s) => s.isAuthenticated);

    if (isAuth) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};