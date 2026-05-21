'use client'

import { Product } from '@/lib/data'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Search, Menu, User, Sun, Moon, LogOut, Home, Info, Phone, Smartphone } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCartStore } from '@/lib/stores/cart-store'
import { useAuthStore } from '@/lib/stores/auth-store'
import SearchDialog from '@/components/search/SearchDialog'
import AuthModal from '@/components/auth/AuthModal'
import ProfileModal from '@/components/profile/ProfileModal'
import { useSearch } from '@/lib/contexts/search-context'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Главная', icon: Home },
  { href: '/about', label: 'О нас', icon: Info },
  { href: '/contact', label: 'Контакты', icon: Phone },
]

export default function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const totalItems = useCartStore((state) => state.totalItems())
  const { user, isLoggedIn, logout } = useAuthStore()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login')
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { setSelectedProduct } = useSearch()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const handleSearchSelect = (product: Product) => {
    setSelectedProduct(product)
    setIsSearchOpen(false)
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-2 py-2 flex justify-between items-center">

          {/* Лого + бургер (мобайл) */}
          <div className="flex items-center gap-4">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-72 p-0">
                <SheetTitle className="sr-only">Меню</SheetTitle>
                <div className="flex flex-col h-full">

                  {/* Блок профиля в бургере */}
                  <div className="p-5 border-b bg-secondary/40">
                    {isLoggedIn && user ? (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{user.name ?? user.email}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0"
                          onClick={() => { logout(); setIsMenuOpen(false) }}
                        >
                          <LogOut className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <p className="text-sm text-muted-foreground mb-1">Войдите в аккаунт</p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => { setAuthTab('login'); setIsAuthOpen(true); setIsMenuOpen(false) }}
                          >
                            Войти
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => { setAuthTab('register'); setIsAuthOpen(true); setIsMenuOpen(false) }}
                          >
                            Регистрация
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Навигация */}
                  <nav className="flex-1 p-4 space-y-1">
                    {navItems.map(({ href, label, icon: Icon }) => (
                      <Link
                        key={href}
                        href={href}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors hover:bg-accent',
                          isActive(href) && 'bg-accent font-semibold'
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        {label}
                      </Link>
                    ))}
                    <Link
                      href="/#menu-section"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors hover:bg-accent"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                      Меню
                    </Link>
                  </nav>

                  {/* Скачать приложение */}
                  <div className="px-4 pb-3">
                    <a
                      href="#"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary hover:bg-primary/90 transition-colors"
                      onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); alert('Приложение скоро появится в App Store!'); }}
                    >
                      <Smartphone className="h-5 w-5 text-primary-foreground shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-primary-foreground">Скачать приложение</span>
                        <span className="text-xs text-primary-foreground/80">Копи баллы и заказывай быстрее</span>
                      </div>
                    </a>
                  </div>

                  {/* Смена темы в бургере */}
                  <div className="p-4 border-t">
                    {mounted && (
                      <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-accent transition-colors"
                      >
                        {theme === 'dark'
                          ? <Moon className="h-5 w-5 text-muted-foreground" />
                          : <Sun className="h-5 w-5 text-muted-foreground" />}
                        <span className="text-base font-medium">
                          {theme === 'dark' ? 'Тёмная тема' : 'Светлая тема'}
                        </span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          {theme === 'dark' ? 'Выкл.' : 'Вкл.'}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-4">
              <div className="relative w-23 h-18">
                <Image
                  src="/logo.jpg"
                  alt="Уголок вкуса"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Десктопная навигация */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-6">
            {navItems.map(({ href, label }) => (
              <Link key={href} href={href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'text-muted-foreground hover:text-foreground',
                    isActive(href) && 'text-foreground font-semibold bg-accent'
                  )}
                >
                  {label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Правые кнопки */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="h-9 w-9"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Профиль */}
            {mounted && isLoggedIn && user ? (
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 relative"
                onClick={() => setIsProfileOpen(true)}
                title={user.email}
              >
                <User className="h-4 w-4 text-primary" />
              </Button>
            ) : (
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => { setAuthTab('login'); setIsAuthOpen(true) }}
                title="Войти"
              >
                <User className="h-4 w-4" />
              </Button>
            )}

            {/* Корзина */}
            <Link href="/cart" className="relative">
              <Button className="h-9 w-9 relative" size="icon">
                <ShoppingCart className="h-4 w-4" />
              </Button>
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-foreground text-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border border-primary pointer-events-none">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {mounted && (
        <>
          <SearchDialog
            open={isSearchOpen}
            onOpenChange={setIsSearchOpen}
            onProductSelect={handleSearchSelect}
          />
          <AuthModal
            open={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            initialTab={authTab}
          />
          <ProfileModal
            open={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
          />
        </>
      )}
    </>
  )
}
