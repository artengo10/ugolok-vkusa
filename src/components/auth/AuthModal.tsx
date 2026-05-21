'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/lib/stores/auth-store'
import { Loader2, Eye, EyeOff, CheckCircle2 } from 'lucide-react'

const BACKEND = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? 'https://ugolok-vkusa1.ru/api'
  : '/api'

type Tab = 'login' | 'register'
type RegStep = 'form' | 'otp'
type LoginMode = 'form' | 'forgot-email' | 'forgot-code' | 'forgot-done'

interface Props {
  open: boolean
  onClose: () => void
  initialTab?: 'login' | 'register'
}

export default function AuthModal({ open, onClose, initialTab = 'login' }: Props) {
  const { setAuth } = useAuthStore()
  const [tab, setTab] = useState<Tab>(initialTab)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Login
  const [loginMode, setLoginMode] = useState<LoginMode>('form')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showLoginPw, setShowLoginPw] = useState(false)

  // Forgot password
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotCode, setForgotCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showNewPw, setShowNewPw] = useState(false)

  // Register
  const [regStep, setRegStep] = useState<RegStep>('form')
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [showRegPw, setShowRegPw] = useState(false)
  const [regCode, setRegCode] = useState('')

  function reset() {
    setTab(initialTab); setLoading(false); setError('')
    setLoginMode('form')
    setLoginEmail(''); setLoginPassword(''); setShowLoginPw(false)
    setForgotEmail(''); setForgotCode(''); setNewPassword(''); setShowNewPw(false)
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

  async function handleForgotStep1() {
    if (!forgotEmail.trim()) { setError('Введите email'); return }
    setError(''); setLoading(true)
    try {
      await fetch(`${BACKEND}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail.trim().toLowerCase() }),
      })
      // Всегда переходим дальше — не раскрываем существует ли email
      setLoginMode('forgot-code')
    } catch {
      setError('Ошибка сети. Попробуйте ещё раз.')
    } finally {
      setLoading(false)
    }
  }

  async function handleForgotStep2() {
    if (forgotCode.length !== 6) { setError('Введите 6-значный код'); return }
    if (newPassword.length < 6) { setError('Пароль должен быть не менее 6 символов'); return }
    setError(''); setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail.trim().toLowerCase(), code: forgotCode, newPassword }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Ошибка')
      setLoginMode('forgot-done')
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
              onClick={() => { setTab(key); setRegStep('form'); setLoginMode('form'); setError('') }}
              className={`flex-1 pb-2 text-sm font-semibold transition-colors ${tab === key ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
            >
              {key === 'login' ? 'Войти' : 'Регистрация'}
            </button>
          ))}
        </div>

        {/* ── Войти: обычная форма ── */}
        {tab === 'login' && loginMode === 'form' && (
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
              <div className="flex items-center justify-between">
                <Label>Пароль</Label>
                <button
                  type="button"
                  className="text-xs text-primary hover:underline"
                  onClick={() => { setForgotEmail(loginEmail); setError(''); setLoginMode('forgot-email') }}
                >
                  Забыли пароль?
                </button>
              </div>
              <div className="relative">
                <Input
                  placeholder="Минимум 6 символов"
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

        {/* ── Войти: шаг 1 сброса — email ── */}
        {tab === 'login' && loginMode === 'forgot-email' && (
          <div className="flex flex-col gap-4 pt-1">
            <div>
              <p className="text-sm font-semibold mb-1">Сброс пароля</p>
              <p className="text-sm text-muted-foreground">Введите email — мы отправим код для создания нового пароля.</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Email</Label>
              <Input
                placeholder="example@mail.ru"
                type="email"
                value={forgotEmail}
                onChange={e => setForgotEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleForgotStep1()}
                autoFocus
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button onClick={handleForgotStep1} disabled={loading} className="w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Отправить код
            </Button>
            <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => { setLoginMode('form'); setError('') }}>
              ← Назад
            </Button>
          </div>
        )}

        {/* ── Войти: шаг 2 сброса — код + новый пароль ── */}
        {tab === 'login' && loginMode === 'forgot-code' && (
          <div className="flex flex-col gap-4 pt-1">
            <p className="text-sm text-muted-foreground">
              Код отправлен на <strong>{forgotEmail}</strong>
            </p>
            <div className="flex flex-col gap-1.5">
              <Label>Код из письма</Label>
              <Input
                placeholder="000000"
                value={forgotCode}
                onChange={e => setForgotCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="text-center text-2xl tracking-widest font-bold"
                maxLength={6}
                autoFocus
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Новый пароль</Label>
              <div className="relative">
                <Input
                  placeholder="Минимум 6 символов"
                  type={showNewPw ? 'text' : 'password'}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleForgotStep2()}
                  className="pr-10"
                />
                <button type="button" onClick={() => setShowNewPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showNewPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button onClick={handleForgotStep2} disabled={loading} className="w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Сменить пароль
            </Button>
            <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => { setLoginMode('forgot-email'); setError('') }}>
              ← Назад
            </Button>
          </div>
        )}

        {/* ── Войти: сброс успешен ── */}
        {tab === 'login' && loginMode === 'forgot-done' && (
          <div className="flex flex-col items-center gap-3 py-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <p className="text-base font-semibold">Пароль изменён!</p>
            <p className="text-sm text-muted-foreground text-center">Теперь войдите с новым паролем.</p>
            <Button className="w-full mt-2" onClick={() => { setLoginEmail(forgotEmail); setLoginMode('form'); setError('') }}>
              Войти
            </Button>
          </div>
        )}

        {/* ── Регистрация: форма ── */}
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
                  placeholder="Минимум 6 символов"
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

        {/* ── Регистрация: OTP ── */}
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
