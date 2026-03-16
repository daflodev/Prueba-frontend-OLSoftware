import type { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'none'; // Añadido 'none'
    isLoading?: boolean;
    children: ReactNode;
}

export const Button = ({
    variant = 'primary',
    isLoading,
    children,
    className = "",
    ...props
}: ButtonProps) => {

    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        ghost: 'bg-transparent hover:bg-gray-100 text-gray-600',
        none: '', // Variante limpia para control total vía className
    };

    return (
        <button
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Cargando...
                </div>
            ) : (
                children
            )}
        </button>
    );
};