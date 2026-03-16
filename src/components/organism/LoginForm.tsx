import { useForm } from 'react-hook-form';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { useAuth } from '../../hooks/useAuth';
import type { LoginCredentials } from '@/types/authTypes';


export const LoginForm = () => {
    const { handleLogin, isSubmitting } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>();

    const onSubmit = (data: LoginCredentials) => handleLogin(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="text-center px-4 -mb-2 -mt-4">
                <p className="text-[13px] leading-tight text-gray-700 font-medium">
                    Digita tu documento de identidad del propietario o representante legal y la contraseña
                </p>
            </div>
            <hr className="border-0 border-t border-gray-400 w-[calc(100%+4rem)] -mx-8 my-6" />

            <Input
                {...register('correoElectronico', { required: 'El documento es obligatorio' })}
                label="Documento"
                placeholder="Ej: 12345678"
                error={errors.correoElectronico?.message}
            />

            <Input
                {...register('contrasena', { required: 'La contraseña es obligatoria' })}
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                error={errors.contrasena?.message}
            />

            <div className="flex items-center gap-2">
                <input type="checkbox" id="terms" className="rounded border-gray-300" required />
                <label htmlFor="terms" className="text-xs text-gray-900">Acepto términos y condiciones</label>
            </div>

            <Button
                type="submit"
                className="w-full bg-[#E91E63] hover:bg-[#D81B60] py-3 rounded-md transition-colors text-white"
                isLoading={isSubmitting}
                variant='none'
            >
                Iniciar sesión
            </Button>
        </form>
    );
};