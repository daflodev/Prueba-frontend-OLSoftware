import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthState, User } from '@/types/authTypes';

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false, 

            actions: {
                setAuth: (user: User) =>
                    set({ user, isAuthenticated: true, isLoading: false }),

                clearAuth: () =>
                    set({ user: null, isAuthenticated: false, isLoading: false }),

                setLoading: (status: boolean) =>
                    set({ isLoading: status }),
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
);

export const useAuthUser = () => useAuthStore((s) => s.user);
export const useIsAuthenticated = () => useAuthStore((s) => s.isAuthenticated);
export const useAuthActions = () => useAuthStore((s) => s.actions);