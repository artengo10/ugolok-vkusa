'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'

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
      <button onClick={dismiss} className="text-muted-foreground hover:text-foreground shrink-0 p-0.5">
        <X className="h-4 w-4" />
      </button>

      <div className="relative w-10 h-10 shrink-0 rounded-xl overflow-hidden border border-border">
        <Image src="/logo.jpg" alt="Уголок вкуса" fill className="object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-tight truncate">Уголок вкуса</p>
        <p className="text-xs text-muted-foreground leading-tight truncate">
          Копи баллы и заказывай быстрее в приложении
        </p>
      </div>

      <div className="flex gap-2 shrink-0">
        <a
          href="https://apps.apple.com/ru/app/id6770677969"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          App Store (iOS)
        </a>
        <a
          href="https://www.rustore.ru/catalog/app/ru.ugolokvkusa1"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          RuStore (Android)
        </a>
      </div>
    </div>
  )
}
