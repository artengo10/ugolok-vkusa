'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthUser {
  id: string
  email: string
  name: string | null
  bonusPoints: number
}

interface AuthStore {
  user: AuthUser | null
  token: string | null
  isLoggedIn: boolean
  setAuth: (user: AuthUser, token: string) => void
  updateUser: (patch: Partial<AuthUser>) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      setAuth: (user, token) => set({ user, token, isLoggedIn: true }),
      updateUser: (patch) =>
        set((s) => ({ user: s.user ? { ...s.user, ...patch } : null })),
      logout: () => set({ user: null, token: null, isLoggedIn: false }),
    }),
    { name: 'ugolok-auth', skipHydration: true }
  )
)
