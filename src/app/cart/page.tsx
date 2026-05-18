'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, Clock, User2, Truck, ShoppingBag, CheckCircle2, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import CartTabs from '@/components/cart/CartTabs'
import CartItemsList from '@/components/cart/CartItemsList'
import { useCartStore } from '@/lib/stores/cart-store'
import { useAuthStore } from '@/lib/stores/auth-store'
import { showToast } from '@/lib/utils/toast'
import { isValidPhone, isBlacklisted } from '@/lib/validation'

const ORDER_URL = '/api/telegram/order'

const DELIVERY_AREAS = [
  { id: 'sormovo', name: 'Сормовский', price: 1500 },
  { id: 'moscow', name: 'Московский', price: 1750 },
  { id: 'kanavino', name: 'Канавинский', price: 1950 },
  { id: 'lenin', name: 'Ленинский', price: 2150 },
]

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-primary">{icon}</span>
      <h3 className="font-semibold text-base">{title}</h3>
    </div>
  )
}

export default function CartPage() {
  const [orderType, setOrderType] = useState('delivery')
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', pickupTime: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [confirmedPhone, setConfirmedPhone] = useState('')

  const { items, totalPrice, clearCart, calculatePrepayment, selectedArea, setDeliveryArea } = useCartStore()
  const { token } = useAuthStore()

  const subtotal = totalPrice()
  const deliveryCost = orderType === 'delivery' && selectedArea ? selectedArea.price : 0
  const prepayment = calculatePrepayment(orderType, subtotal)
  const finalTotal = subtotal + deliveryCost - prepayment

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleOrder = async () => {
    if (isBlacklisted(formData.phone)) { showToast.error('Заказ не может быть оформлен'); return }
    if (!isValidPhone(formData.phone)) { showToast.error('Номер телефона должен содержать 10-11 цифр'); return }
    if (orderType === 'delivery' && !selectedArea) { showToast.error('Выберите район доставки'); return }
    if (!formData.name || !formData.phone || (orderType === 'delivery' ? !formData.address : !formData.pickupTime)) {
      showToast.error('Заполните все обязательные поля'); return
    }
    setIsSubmitting(true)
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (token) headers['Authorization'] = `Bearer ${token}`
      const response = await fetch(ORDER_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          type: orderType === 'delivery' ? 'DELIVERY' : 'PICKUP',
          address: formData.address || undefined,
          district: selectedArea?.name || undefined,
          pickupTime: formData.pickupTime || undefined,
          items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
          delivery: deliveryCost,
          total: subtotal + deliveryCost,
          finalTotal,
          prepayment,
          source: 'website',
        }),
      })
      if (!response.ok) throw new Error('Ошибка при отправке заказа')
      setConfirmedPhone(formData.phone)
      clearCart()
      setOrderSuccess(true)
    } catch {
      showToast.error('Ошибка при отправке заказа. Попробуйте еще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormInvalid =
    !formData.name ||
    !formData.phone ||
    (orderType === 'delivery' ? !formData.address : !formData.pickupTime) ||
    (orderType === 'delivery' && !selectedArea) ||
    isBlacklisted(formData.phone) ||
    !isValidPhone(formData.phone)

  if (orderSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md text-center">
        <div className="bg-card rounded-2xl border p-8 space-y-5">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
          <div>
            <h2 className="text-2xl font-heading font-bold mb-2">Заказ принят!</h2>
            <p className="text-muted-foreground">Спасибо за ваш заказ</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4 flex items-start gap-3 text-left">
            <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Мы перезвоним вам в течение 5–10 минут</p>
              <p className="text-muted-foreground text-sm mt-0.5">на номер <span className="font-medium text-foreground">{confirmedPhone}</span></p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Если звонка нет — позвоните нам: <br />
            <a href="tel:+79696252020" className="text-primary font-medium">+7 (969) 625-20-20</a>
          </p>
          <Button asChild className="w-full h-11">
            <Link href="/">Вернуться в меню</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-md">
        <p className="text-5xl mb-4">🛒</p>
        <p className="text-xl font-semibold mb-2">Корзина пуста</p>
        <p className="text-muted-foreground mb-6">Добавьте блюда из нашего меню</p>
        <Button asChild size="lg">
          <Link href="/">Перейти в меню</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors text-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        Назад в меню
      </Link>

      <h1 className="text-2xl font-heading font-bold mb-6">Корзина</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Левая колонка — форма */}
        <div className="lg:col-span-3 space-y-4">

          {/* Способ получения */}
          <div className="bg-card rounded-xl p-5 border">
            <SectionHeader icon={<Truck className="h-5 w-5" />} title="Как получить заказ?" />
            <CartTabs value={orderType} onValueChange={setOrderType} />
          </div>

          {/* Ваши данные */}
          <div className="bg-card rounded-xl p-5 border">
            <SectionHeader icon={<User2 className="h-5 w-5" />} title="Ваши данные" />
            <div className="space-y-3">
              <div>
                <label className="text-sm font-semibold block mb-1.5">Имя *</label>
                <Input
                  name="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="h-11"
                />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1.5">Телефон *</label>
                <Input
                  name="phone"
                  placeholder="+7 (999) 123-45-67"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="h-11"
                />
              </div>
            </div>
          </div>

          {/* Доставка или самовывоз */}
          <div className="bg-card rounded-xl p-5 border">
            {orderType === 'delivery' ? (
              <>
                <SectionHeader icon={<MapPin className="h-5 w-5" />} title="Адрес доставки" />
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold block mb-1.5">Адрес *</label>
                    <Input
                      name="address"
                      placeholder="ул. Примерная, д. 1, кв. 1"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="h-11"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold block mb-2">Выберите район *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {DELIVERY_AREAS.map((area) => (
                        <button
                          key={area.id}
                          type="button"
                          onClick={() => setDeliveryArea(area)}
                          className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all text-left ${
                            selectedArea?.id === area.id
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border bg-background hover:border-primary/50'
                          }`}
                        >
                          <div>{area.name}</div>
                          <div className="text-xs opacity-70 mt-0.5">+{area.price} ₽</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <SectionHeader icon={<Clock className="h-5 w-5" />} title="Время самовывоза" />
                <div>
                  <label className="text-sm font-semibold block mb-1.5">Удобное время *</label>
                  <Input
                    name="pickupTime"
                    type="time"
                    value={formData.pickupTime}
                    onChange={handleInputChange}
                    className="h-11 w-36"
                  />
                  <p className="text-xs text-muted-foreground mt-2">Адрес: ул. Исполкома, 6/2</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Правая колонка — итог */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl border overflow-hidden sticky top-24">
            <div className="p-5 border-b">
              <SectionHeader icon={<ShoppingBag className="h-5 w-5" />} title="Ваш заказ" />
              <CartItemsList />
            </div>

            {prepayment > 0 && (
              <div className="px-5 py-3 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-800">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  💳 Требуется предоплата: {prepayment} ₽
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                  Для заказов от 2000 ₽ с самовывозом
                </p>
              </div>
            )}

            <div className="p-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Товары</span>
                <span>{subtotal} ₽</span>
              </div>
              {deliveryCost > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  <span>+{deliveryCost} ₽</span>
                </div>
              )}
              {prepayment > 0 && (
                <div className="flex justify-between text-sm text-amber-600 dark:text-amber-400">
                  <span>Предоплата</span>
                  <span>-{prepayment} ₽</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>К оплате</span>
                <span className={prepayment > 0 ? 'text-green-600 dark:text-green-400' : ''}>
                  {finalTotal} ₽
                </span>
              </div>

              <Button
                className="w-full h-12 text-base font-semibold mt-1"
                onClick={handleOrder}
                disabled={isFormInvalid || isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : prepayment > 0 ? 'Перейти к предоплате' : 'Оформить заказ'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
