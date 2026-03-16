import { useState } from 'react';
import { useAuthUser } from '@/store/useAuthStore';
import { useAuth } from '@/hooks/useAuth';
import { NavLink } from 'react-router-dom';
import { ThumbsUp, User, Menu, X, UserRound } from 'lucide-react';

export const Header = () => {
    const user = useAuthUser();
    const { handleLogout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="relative z-30 h-20 bg-white shadow-sm px-4 md:px-8 flex items-center justify-between border-b border-gray-200">

           
            <div className="flex flex-col items-center justify-center pt-8">
               
                <img
                    src="https://olsoftware.com/wp-content/uploads/2021/04/Logo-OL-Software-2-02-150x150.png"
                    alt="OL"
                    className="h-16 w-auto object-contain -m-8" 
                />

               
                <div className="flex flex-col items-center leading-tight mt-1">
                    <span className="text-black font-semibold text-xs whitespace-nowrap">
                        Software &
                    </span>
                    <span className="text-black text-[11px] font-semibold -mt-0.5 whitespace-nowrap">
                        Development
                    </span>
                </div>
            </div>

          
            {user && (


                <>

                    <nav className="hidden md:flex items-center lg:gap-20 md:gap-8">
                        <NavLink
                            to="/dashboard"
                            end
                            className={({ isActive }) => `flex items-center gap-2 transition-opacity ${isActive ? 'text-[#0a125a]' : 'text-gray-400 hover:opacity-70'}`}
                        >
                            {({ isActive }) => (
                                <>
                                    <span className={`w-5 h-5 rounded-full text-white text-[11px] font-bold flex items-center justify-center ${isActive ? 'bg-[#2563eb]' : 'bg-gray-400'}`}>
                                        1
                                    </span>
                                    <span className="font-bold text-[13px] lg:text-[14px] whitespace-nowrap">Lista Formulario</span>
                                </>
                            )}
                        </NavLink>

                        <div className="h-6 w-px bg-gray-300"></div>

                        <NavLink
                            to="/comerciante/nuevo"
                            className={({ isActive }) => `flex items-center gap-2 transition-opacity ${isActive ? 'text-[#0a125a]' : 'text-gray-400 hover:opacity-70'}`}
                        >
                            {({ isActive }) => (
                                <>
                                    <span className={`w-5 h-5 rounded-full text-white text-[11px] font-bold flex items-center justify-center ${isActive ? 'bg-[#2563eb]' : 'bg-gray-400'}`}>
                                        2
                                    </span>
                                    <span className="font-bold text-[13px] lg:text-[14px] whitespace-nowrap">Crear Formulario</span>
                                </>
                            )}
                        </NavLink>
                    </nav>

                </>
            )}

           
            <div className="flex items-center gap-4 lg:gap-10">

             
                <div className="hidden xl:flex items-center gap-2 cursor-pointer group">
                    <div className="w-7 h-7 rounded-full bg-[#3e2723] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                        <ThumbsUp size={13} className="text-[#d4af37]" strokeWidth={2.5} />
                    </div>
                    <span className="text-[#0a125a] font-bold text-[13px] tracking-tight group-hover:text-[#e81f76] transition-colors">
                        Beneficios por renovar
                    </span>
                </div>

       
                {user && (
                    <div className="flex items-center gap-2 md:gap-3">
                 

                 
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10  rounded-full border border-gray-300 hover:border-red-400 hover:bg-red-50 transition-all overflow-hidden group"
                        >
                            <UserRound size={35} className="text-gray-500 group-hover:text-red-500" strokeWidth={1} color='black' />
                        </button>
                        <div className="hidden md:flex flex-col text-right leading-tight">
                            <span className="text-[#0a125a] font-bold text-[13px]">Bienvenido!</span>
                            <span className="text-gray-600 text-[11px] truncate max-w-[100px]">{user.nombre}</span>
                        </div>
                    </div>
                )}

            
                <button
                    className="md:hidden p-2 text-[#0a125a]"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

   
            {isMenuOpen && (
                <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-200 shadow-xl flex flex-col p-4 gap-4 md:hidden animate-in slide-in-from-top duration-300">
                    <NavLink
                        to="/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
                    >
                        <span className="w-6 h-6 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-xs">1</span>
                        <span className="font-bold text-[#0a125a]">Lista Formulario</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/crear"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
                    >
                        <span className="w-6 h-6 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs">2</span>
                        <span className="font-bold text-gray-500">Crear Formulario</span>
                    </NavLink>
                    <hr />
                    <div className="flex items-center justify-between px-3 py-2 text-gray-500">
                        <span className="text-sm italic">{user?.nombre} ({user?.rol})</span>
                        <button onClick={handleLogout} className="text-red-500 text-sm font-bold">Cerrar Sesión</button>
                    </div>
                </div>
            )}
        </header>
    );
};