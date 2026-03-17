import type { ReactNode } from "react";

interface AuthLayoutProps { children: ReactNode }

export const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <>
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-login-pattern"

            >
                <div className="absolute inset-0 bg-black/30 opacity-90 backdrop-blur-sm"></div>
            </div>

            <main className="relative z-10 flex-1 flex items-center justify-center p-4">
                {children}
            </main>
        </>

    );
};