import type { EstadoComerciante } from '@/types/comerciante';
import React from 'react';


interface BadgeProps {
    estado: EstadoComerciante;
}

export const Badge: React.FC<BadgeProps> = ({ estado }) => {
    const isActive = estado === 'Activo';

    const baseStyle = "px-3 py-1 rounded-full text-sm font-semibold border";
    const colors = isActive
        ? "bg-white text-green-600 border-green-500"
        : "bg-white text-red-500 border-red-500";

    return (
        <span className={`${baseStyle} ${colors}`}>
            {estado}
        </span>
    );
};