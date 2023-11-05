import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthedUser } from '@/data/dtos/authed-user.ts';

interface MyState {
  user?: AuthedUser;
  token?: string;
  signIn: (token: string, user: AuthedUser) => void,
  signOut: () => void
}

export const useAuthStore = create<MyState>()(
  persist(
    (set, get) => ({
      signIn: (token, user) => {
        set({ token, user });
      },
      signOut: () => {
        set({ token: undefined, user: undefined })
      }
    }), { name: 'auth' }
  )
);
