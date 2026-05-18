'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/lib/stores/auth-store'
import { Loader2 } from 'lucide-react'

const BACKEND = process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : '/api'

type Step = 'form' | 'otp'

interface Props {
  open: boolean
  onClose: () => void
  onSwitchToLogin?: () => void
}

export default function RegisterModal({ open, onClose, onSwitchToLogin }: Props) {
  const { setAuth } = useAuthStore()
  const [step, setStep] = useState<Step>('form')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const reset = () => { setStep('form'); setName(''); setEmail(''); setOtp(''); setError('') }
  const handleClose = () => { reset(); onClose() }

  const handleSendOtp = async () => {
    if (name.trim().length < 2) { setError('Введите имя (минимум 2 символа)'); return }
    if (!email.includes('@')) { setError('Введите корректный email'); return }
    setError(''); setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), type: 'register' }),
      })
      if (!res.ok) throw new Error((await res.json()).error || 'Ошибка')
      setStep('otp')
    } catch (e: any) { setError(e.message) }
    finally { setLoading(false) }
  }

  const handleVerify = async () => {
    if (otp.length !== 6) { setError('Код должен быть 6 цифр'); return }
    setError(''); setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otp, name: name.trim() }),
      })
      if (!res.ok) throw new Error((await res.json()).error || 'Неверный код')
      const data = await res.json()
      setAuth(data.user, data.token)
      handleClose()
    } catch (e: any) { setError(e.message) }
    finally { setLoading(false) }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{step === 'form' ? 'Регистрация' : 'Подтверждение email'}</DialogTitle>
        </DialogHeader>

        {step === 'form' ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Ваше имя</Label>
              <Input
                placeholder="Иванов Иван Иванович"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                autoFocus
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Email</Label>
              <Input
                placeholder="example@mail.ru"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendOtp()}
                autoComplete="email"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button onClick={handleSendOtp} disabled={loading} className="w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Зарегистрироваться
            </Button>
            {onSwitchToLogin && (
              <p className="text-center text-sm text-muted-foreground">
                Уже есть аккаунт?{' '}
                <button
                  onClick={() => { handleClose(); onSwitchToLogin() }}
                  className="text-primary hover:underline font-medium"
                >
                  Войти
                </button>
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Код отправлен на <strong>{email}</strong>
            </p>
            <div className="flex flex-col gap-1.5">
              <Label>Код из письма</Label>
              <Input
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                className="text-center text-2xl tracking-widest font-bold"
                maxLength={6}
                autoFocus
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button onClick={handleVerify} disabled={loading} className="w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Подтвердить
            </Button>
            <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => { setStep('form'); setError(''); setOtp('') }}>
              ← Назад
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
