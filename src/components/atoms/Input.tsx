import { forwardRef, type InputHTMLAttributes,  } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1 w-full mt-4">
                <div className="relative">
                    {label && (
                        <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-medium text-gray-500 transition-all">
                            {label}
                        </label>
                    )}
                    <input
                        ref={ref}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-pink-500 outline-none transition-all placeholder:text-transparent focus:placeholder:text-gray-400 ${error ? 'border-red-500' : 'border-gray-300'
                            } ${className}`}
                        {...props}
                    />
                </div>
                {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';