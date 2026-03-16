import { AuthLayout } from '../components/templates/AuthLayout';
import { Card } from '../components/atoms/Card';
import { LoginForm } from '@/components/organism/LoginForm';


const LoginPage = () => {
    return (
        <AuthLayout>
            <div className="w-full max-w-md">
                <h2 className="text-white text-center text-lg font-bold mb-2 drop-shadow-md">
                    Debes iniciar sesión para acceder a la plataforma
                </h2>

                <Card className="bg-white/95 backdrop-blur shadow-2xl p-8 rounded-xl">
                    <LoginForm />
                </Card>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;