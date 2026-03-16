import { Outlet } from 'react-router-dom';
import { Header } from '../organism/Header'; // Ajusta la ruta a tu componente
import { useAuthUser } from '@/store/useAuthStore';

export const RootLayout = () => {

    const user = useAuthUser();
    return (

        <div className="h-screen flex flex-col overflow-hidden bg-gray-50">

            <Header />

            <main className="flex-1 overflow-y-auto relative">
                <div className="max-w-7xl mx-auto p-4 md:p-6">
                    <Outlet />
                </div>
            </main>
            {user && (

                <footer className="w-full bg-[#0a125a] text-white py-8 text-center text-sm font-medium shrink-0">
                    Prueba Técnica De Uso Exclusivo de OLSoftware S.A.
                </footer>

            )}

        </div>
    );
};