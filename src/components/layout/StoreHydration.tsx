'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/lib/stores/cart-store'
import { useAuthStore } from '@/lib/stores/auth-store'

export default function StoreHydration() {
  useEffect(() => {
    useCartStore.persist.rehydrate()
    useAuthStore.persist.rehydrate()
  }, [])
  return null
}
