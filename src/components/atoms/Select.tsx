import { forwardRef, type SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string | number; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, className, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1 w-full mt-4">
                <div className="relative">
                    {label && (
                        <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-medium text-gray-500 z-10">
                            {label}
                        </label>
                    )}
                    <select
                        ref={ref}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-pink-500 outline-none bg-white appearance-none ${error ? 'border-red-500' : 'border-gray-300'
                            } ${className}`}
                        {...props}
                    >
                        <option value="">Seleccione una opción</option>
                        {options.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
                {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
            </div>
        );
    }
);
Select.displayName = 'Select';