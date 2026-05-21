'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/lib/stores/auth-store'
import { Loader2, Eye, EyeOff } from 'lucide-react'

const BACKEND = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? 'https://ugolok-vkusa1.ru/api'
  : '/api'

type Tab = 'login' | 'register'
type RegStep = 'form' | 'otp'

interface Props {
  open: boolean
  onClose: () => void
}

export default function AuthModal({ open, onClose }: Props) {
  const { setAuth } = useAuthStore()
  const [tab, setTab] = useState<Tab>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showLoginPw, setShowLoginPw] = useState(false)

  const [regStep, setRegStep] = useState<RegStep>('form')
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [showRegPw, setShowRegPw] = useState(false)
  const [regCode, setRegCode] = useState('')

  function reset() {
    setTab('login'); setLoading(false); setError('')
    setLoginEmail(''); setLoginPassword(''); setShowLoginPw(false)
    setRegStep('form'); setRegName(''); setRegEmail(''); setRegPassword('')
    setShowRegPw(false); setRegCode('')
  }

  const handleClose = () => { reset(); onClose() }

  async function handleLogin() {
    if (!loginEmail.trim() || !loginPassword) { setError('Заполните все поля'); return }
    setError(''); setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail.trim().toLowerCase(), password: loginPassword }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Ошибка входа')
      setAuth(data.user, data.token)
      handleClose()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Ошибка')
    } finally {
      setLoading(false)
    }
  }

  async function handleRegisterStep1() {
    if (!regName.trim() || !regEmail.trim() || !regPassword) { setError('Заполните все поля'); return }
    if (regPassword.length < 6) { setError('Пароль должен быть не менее 6 символов'); return }
    setError(''); setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: regName.trim(), email: regEmail.trim().toLowerCase(), password: regPassword }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Ошибка')
      setRegStep('otp')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Ошибка')
    } finally {
      setLoading(false)
    }
  }

  async function handleRegisterStep2() {
    if (regCode.length !== 6) { setError('Введите 6-значный код'); return }
    setError(''); setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/auth/verify-registration`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: regEmail.trim().toLowerCase(), code: regCode }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Неверный код')
      setAuth(data.user, data.token)
      handleClose()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Ошибка')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Войти или зарегистрироваться</DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex border-b">
          {(['login', 'register'] as Tab[]).map(key => (
            <button
              key={key}
              onClick={() => { setTab(key); setRegStep('form'); setError('') }}
              className={`flex-1 pb-2 text-sm font-semibold transition-colors ${tab === key ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
            >
              {key === 'login' ? 'Войти' : 'Регистрация'}
            </button>
          ))}
        </div>

        {tab === 'login' && (
          <div className="flex flex-col gap-4 pt-1">
            <div className="flex flex-col gap-1.5">
              <Label>Email</Label>
              <Input
                placeholder="example@mail.ru"
                type="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Пароль</Label>
              <div className="relative">
                <Input
                  placeholder="Минимум 8 символов"
                  type={showLoginPw ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  autoComplete="current-password"
                  className="pr-10"
                />
                <button type="button" onClick={() => setShowLoginPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showLoginPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button onClick={handleLogin} disabled={loading} className="w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Войти
            </Button>
          </div>
        )}

        {tab === 'register' && regStep === 'form' && (
          <div className="flex flex-col gap-4 pt-1">
            <div className="flex flex-col gap-1.5">
              <Label>Имя</Label>
              <Input placeholder="Ваше имя" value={regName} onChange={e => setRegName(e.target.value)} autoComplete="name" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Email</Label>
              <Input placeholder="example@mail.ru" type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} autoComplete="email" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Пароль</Label>
              <div className="relative">
                <Input
                  placeholder="Минимум 8 символов"
                  type={showRegPw ? 'text' : 'password'}
                  value={regPassword}
                  onChange={e => setRegPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleRegisterStep1()}
                  autoComplete="new-password"
                  className="pr-10"
                />
                <button type="button" onClick={() => setShowRegPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showRegPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button onClick={handleRegisterStep1} disabled={loading} className="w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Получить код на email
            </Button>
          </div>
        )}

        {tab === 'register' && regStep === 'otp' && (
          <div className="flex flex-col gap-4 pt-1">
            <p className="text-sm text-muted-foreground">
              Код отправлен на <strong>{regEmail}</strong>
            </p>
            <div className="flex flex-col gap-1.5">
              <Label>Код из письма</Label>
              <Input
                placeholder="000000"
                value={regCode}
                onChange={e => setRegCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                onKeyDown={e => e.key === 'Enter' && handleRegisterStep2()}
                className="text-center text-2xl tracking-widest font-bold"
                maxLength={6}
                autoFocus
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button onClick={handleRegisterStep2} disabled={loading} className="w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Подтвердить
            </Button>
            <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => { setRegStep('form'); setError(''); setRegCode('') }}>
              ← Назад
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
