import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../organism/Header';
import { useAuthUser } from '@/store/useAuthStore';

export const RootLayout = () => {
    const user = useAuthUser();
    const location = useLocation();

    const isForm = location.pathname.includes('/nuevo') || location.pathname.includes('/editar');

    return (
        <div className="h-screen w-full flex flex-col overflow-hidden bg-[#dbe4fc]">
            <Header />

            {isForm ? (
                <></>
            ) : <div className="w-full bg-[#eaecf3] px-10 py-4 border-b border-gray-200 shadow-sm z-20">
                <h1 className="text-[20px] font-bold text-[#0a125a]">Lista de Formularios creados</h1>
            </div> }

            {/* Contenido */}
            <main className={`flex-1 overflow-y-auto relative ${!isForm ? 'max-w-7xl mx-auto p-4 w-full' : ''}`}>
                <Outlet />
            </main>

            {/* Footer de Totales */}
            {isForm ? (
                <></>
            ) : (
                user && <footer className="bg-[#0a125a] text-white py-4 text-center text-xs">OL Software S.A. © 2026</footer>
            )}
        </div>
    );
};