'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CartOrderFormProps {
    orderType: string
    formData: {
        name: string
        phone: string
        address: string
        pickupTime: string
    }
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function CartOrderForm({
    orderType,
    formData,
    onInputChange
}: CartOrderFormProps) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Имя *</Label>
                <Input
                    id="name"
                    name="name"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={onInputChange}
                    className="bg-background"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Телефон *</Label>
                <Input
                    id="phone"
                    name="phone"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={onInputChange}
                    className="bg-background"
                />
            </div>

            {orderType === 'delivery' && (
                <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium">Адрес доставки *</Label>
                    <Input
                        id="address"
                        name="address"
                        placeholder="ул. Примерная, д. 1, кв. 1"
                        value={formData.address}
                        onChange={onInputChange}
                        className="bg-background"
                    />
                </div>
            )}

            {orderType === 'pickup' && (
                <div className="space-y-2">
                    <Label htmlFor="pickupTime" className="text-sm font-medium">Время забрать *</Label>
                    <Input
                        id="pickupTime"
                        name="pickupTime"
                        type="time"
                        value={formData.pickupTime}
                        onChange={onInputChange}
                        className="bg-background"
                    />
                </div>
            )}
        </div>
    )
}