'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { useCartStore } from '@/lib/stores/cart-store'
import CartTabs from './CartTabs'
import CartOrderForm from './CartOrderForm'
import CartItemsList from './CartItemsList'
import { showToast } from '@/lib/utils/toast'
import {
    isValidPhone,
    isBlacklisted
} from '@/lib/validation'

// Добавляем константы районов прямо в компонент
const DELIVERY_AREAS = [
    { id: 'sormovo', name: 'Сормовский район', price: 1000 },
    { id: 'moscow', name: 'Московский район', price: 1350 },
    { id: 'kanavino', name: 'Канавинский район', price: 1500 },
    { id: 'lenin', name: 'Ленинский район', price: 1750 }
]

interface CartProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function Cart({ open, onOpenChange }: CartProps) {
    const [orderType, setOrderType] = useState('delivery')
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        pickupTime: '',
        district: '' // Добавляем поле для района
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { items, totalPrice, clearCart, calculatePrepayment, selectedArea, setDeliveryArea } = useCartStore()
    const subtotal = totalPrice()
    const deliveryCost = orderType === 'delivery' && selectedArea ? selectedArea.price : 0
    const prepayment = calculatePrepayment(orderType, subtotal)
    const finalTotal = subtotal + deliveryCost - prepayment

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleDistrictChange = (area: typeof DELIVERY_AREAS[0]) => {
        setDeliveryArea(area)
        setFormData(prev => ({ ...prev, district: area.name }))
    }

    const handleOrder = async () => {
        // Проверка черного списка
        if (isBlacklisted(formData.phone)) {
            showToast.error('Заказ не может быть оформлен')
            return
        }

        // Проверка номера телефона
        if (!isValidPhone(formData.phone)) {
            showToast.error('Номер телефона должен содержать 10-11 цифр')
            return
        }

        // Проверка выбора района для доставки
        if (orderType === 'delivery' && !selectedArea) {
            showToast.error('Выберите район доставки')
            return
        }

        // Базовые проверки заполненности полей
        if (!formData.name || !formData.phone ||
            (orderType === 'delivery' ? !formData.address : !formData.pickupTime)) {
            showToast.error('Заполните все обязательные поля')
            return
        }

        setIsSubmitting(true)

        try {
            // Отправляем заказ в Telegram (добавляем район в данные)
            const response = await fetch('/api/telegram/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    type: orderType,
                    address: formData.address,
                    district: selectedArea?.name || '', // Добавляем район
                    pickupTime: formData.pickupTime,
                    items: items,
                    subtotal: subtotal,
                    delivery: deliveryCost,
                    total: subtotal + deliveryCost,
                    prepayment: prepayment,
                    finalTotal: finalTotal
                })
            })

            if (!response.ok) {
                throw new Error('Ошибка при отправке заказа')
            }

            // Уведомление о предоплате
            if (prepayment > 0) {
                showToast.info(`Требуется предоплата: ${prepayment}₽`)
            }

            showToast.orderCreated()
            clearCart()
            onOpenChange(false)
            setFormData({ name: '', phone: '', address: '', pickupTime: '', district: '' })

        } catch (error) {
            console.error('Order error:', error)
            showToast.error('Ошибка при отправке заказа. Попробуйте еще раз.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const isFormInvalid =
        !formData.name ||
        !formData.phone ||
        (orderType === 'delivery' ? !formData.address : !formData.pickupTime) ||
        (orderType === 'delivery' && !selectedArea) || // Добавляем проверку района
        isBlacklisted(formData.phone) ||
        !isValidPhone(formData.phone)

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md w-[95vw] max-w-2xl max-h-[85vh] overflow-hidden flex flex-col p-0 mx-auto my-8">
                <DialogHeader className="px-6 pt-6 pb-4 border-b bg-muted/30">
                    <DialogTitle className="text-2xl font-heading text-center">
                        Ваш заказ
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                    <CartTabs value={orderType} onValueChange={setOrderType} />

                    <CartOrderForm
                        orderType={orderType}
                        formData={formData}
                        onInputChange={handleInputChange}
                    />

                    {/* ДОБАВЛЯЕМ ВЫБОР РАЙОНА ДЛЯ ДОСТАВКИ */}
                    {orderType === 'delivery' && (
                        <div className="space-y-3">
                            <label className="text-sm font-medium">Район доставки *</label>
                            <div className="grid grid-cols-2 gap-2">
                                {DELIVERY_AREAS.map((area) => (
                                    <Button
                                        key={area.id}
                                        type="button"
                                        variant={selectedArea?.id === area.id ? "default" : "outline"}
                                        className="h-12 text-sm font-normal"
                                        onClick={() => handleDistrictChange(area)}
                                    >
                                        <div className="text-center">
                                            <div>{area.name}</div>
                                            <div className="text-xs opacity-80">+{area.price}₽</div>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                            {selectedArea && (
                                <p className="text-xs text-muted-foreground">
                                    Выбран: {selectedArea.name} (+{selectedArea.price}₽)
                                </p>
                            )}
                        </div>
                    )}

                    {items.length > 0 && (
                        <div className="border-t pt-4">
                            <h3 className="font-semibold mb-3 text-lg">Товары в заказе</h3>
                            <CartItemsList />

                            {/* Блок с предоплатой */}
                            {prepayment > 0 && (
                                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                                    <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                                        <span className="text-sm font-medium">
                                            💳 Требуется предоплата: {prepayment}₽
                                        </span>
                                    </div>
                                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                                        Для заказов от 2000₽ с самовывозом
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {items.length === 0 && (
                        <div className="flex items-center justify-center h-40">
                            <p className="text-muted-foreground text-center text-lg">
                                Корзина пуста
                            </p>
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t px-6 py-4 bg-muted/30">
                        {/* Сумма товаров */}
                        <div className="flex justify-between text-sm mb-1">
                            <span>Товары:</span>
                            <span>{subtotal} ₽</span>
                        </div>

                        {/* Стоимость доставки */}
                        {deliveryCost > 0 && (
                            <div className="flex justify-between text-sm mb-1">
                                <span>Доставка:</span>
                                <span className="text-green-600">+{deliveryCost} ₽</span>
                            </div>
                        )}

                        {/* Общая сумма */}
                        <div className="flex justify-between text-lg font-semibold mb-2 border-t pt-2">
                            <span>Сумма заказа:</span>
                            <span>{subtotal + deliveryCost} ₽</span>
                        </div>

                        {/* Предоплата */}
                        {prepayment > 0 && (
                            <div className="flex justify-between text-amber-600 dark:text-amber-400 mb-2">
                                <span>Предоплата:</span>
                                <span>-{prepayment} ₽</span>
                            </div>
                        )}

                        {/* Итоговая сумма */}
                        <div className="flex justify-between text-lg font-semibold mb-4 border-t pt-2">
                            <span>К оплате:</span>
                            <span className={prepayment > 0 ? 'text-green-600 dark:text-green-400' : ''}>
                                {finalTotal} ₽
                            </span>
                        </div>

                        <Button
                            className="w-full"
                            size="lg"
                            onClick={handleOrder}
                            disabled={isFormInvalid || isSubmitting}
                        >
                            {isSubmitting ? 'Отправка...' :
                                prepayment > 0 ? 'Перейти к предоплате' : 'Оформить заказ'}
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}