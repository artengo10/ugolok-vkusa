'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/lib/stores/auth-store'
import { Loader2, User, LogOut, Star } from 'lucide-react'

const BACKEND = process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : '/api'

interface Props {
  open: boolean
  onClose: () => void
}

interface ProfileData {
  name: string | null
  phone: string | null
  bonusPoints: number
}

export default function ProfileModal({ open, onClose }: Props) {
  const { user, token, logout } = useAuthStore()
  const [profile, setProfile] = useState<ProfileData>({ name: null, phone: null, bonusPoints: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || !token) return
    setLoading(true)
    fetch(`${BACKEND}/profile`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => setProfile({ name: data.name ?? null, phone: data.phone ?? null, bonusPoints: data.bonusPoints ?? 0 }))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [open, token])

  const handleLogout = () => { logout(); onClose() }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Профиль</DialogTitle>
        </DialogHeader>

        {/* Аватар + email */}
        <div className="flex items-center gap-3 py-1">
          <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold truncate">{user?.name ?? 'Пользователь'}</p>
            <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>

        {/* Баллы */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg px-4 py-3 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500 shrink-0" />
            <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
              Копить и тратить бонусы можно в приложении
            </span>
          </div>
          <div className="flex gap-3 pl-6">
            <a href="https://apps.apple.com/ru/app/id6770677969" target="_blank" rel="noopener noreferrer" className="text-sm font-bold underline text-amber-800 dark:text-amber-200 hover:opacity-80">App Store (iOS)</a>
            <span className="text-amber-500">·</span>
            <a href="https://www.rustore.ru/catalog/app/ru.ugolokvkusa1" target="_blank" rel="noopener noreferrer" className="text-sm font-bold underline text-amber-800 dark:text-amber-200 hover:opacity-80">RuStore (Android)</a>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {/* Имя */}
            <div className="flex items-center justify-between border rounded-lg px-4 py-3">
              <span className="text-sm text-muted-foreground">Имя</span>
              <span className="text-sm font-medium">{profile.name ?? '—'}</span>
            </div>
            <Button variant="outline" onClick={handleLogout} className="w-full text-muted-foreground mt-1">
              <LogOut className="mr-2 h-4 w-4" />
              Выйти из аккаунта
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
