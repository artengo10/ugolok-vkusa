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
        pickupTime: ''
    })

    const { items, totalPrice, clearCart, calculatePrepayment } = useCartStore()
    const total = totalPrice()
    const prepayment = calculatePrepayment(orderType, total)
    const finalTotal = total - prepayment // Итоговая сумма к оплате

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleOrder = () => {
        const order = {
            type: orderType,
            items,
            customer: formData,
            total: total,
            prepayment: prepayment,
            finalTotal: finalTotal
        }

        // Уведомление с информацией о предоплате
        if (prepayment > 0) {
            showToast.info(`Требуется предоплата: ${prepayment}₽`);
        }

        showToast.orderCreated();

        clearCart()
        onOpenChange(false)
        setFormData({ name: '', phone: '', address: '', pickupTime: '' })
    }

    const isFormInvalid = !formData.name || !formData.phone ||
        (orderType === 'delivery' ? !formData.address : !formData.pickupTime)

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
                        {/* Общая сумма */}
                        <div className="flex justify-between text-lg font-semibold mb-2">
                            <span>Сумма заказа:</span>
                            <span>{total} ₽</span>
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
                            disabled={isFormInvalid}
                        >
                            {prepayment > 0 ? 'Перейти к предоплате' : 'Оформить заказ'}
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}