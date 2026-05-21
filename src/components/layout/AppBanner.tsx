'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const STORAGE_KEY = 'ugolok-app-banner-dismissed'

export default function AppBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
  }, [])

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="w-full bg-secondary/80 backdrop-blur border-b border-border flex items-center gap-3 px-3 py-2 sm:px-6">
      {/* Иконка */}
      <button onClick={dismiss} className="text-muted-foreground hover:text-foreground shrink-0 p-0.5">
        <X className="h-4 w-4" />
      </button>

      <div className="relative w-10 h-10 shrink-0 rounded-xl overflow-hidden border border-border">
        <Image src="/logo.jpg" alt="Уголок вкуса" fill className="object-cover" />
      </div>

      {/* Текст */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-tight truncate">Уголок вкуса</p>
        <p className="text-xs text-muted-foreground leading-tight truncate">
          Копи баллы и заказывай быстрее в приложении
        </p>
      </div>

      {/* Кнопка */}
      <button
        onClick={() => alert('Приложение скоро появится в App Store!')}
        className="shrink-0 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap"
      >
        Скачать
      </button>
    </div>
  )
}
