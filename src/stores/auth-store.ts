import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface MyState {
  token?: string;
  setToken: (token: string) => void
}

export const useAuthStore = create<MyState>()(
  persist(
    (set, get) => ({
      setToken: (token) => {
        set({ token });
      },

    }), { name: 'auth' }
  )
);
