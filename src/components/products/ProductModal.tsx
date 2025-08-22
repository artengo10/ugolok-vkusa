'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Coffee, Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'


interface Product {
    id: number
    name: string
    price: number
    description: string
    image?: string
    category: string
}

interface ProductModalProps {
    product: Product | null
    isOpen: boolean
    onClose: () => void
    onAddToCart: (product: Product & { quantity: number }) => void // quantity обязателен
}

export default function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
    const [quantity, setQuantity] = useState(1)

    if (!product) return null

    const handleIncrement = () => {
        setQuantity(prev => prev + 1)
    }

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    const handleAddToCart = () => {
        onAddToCart({ ...product, quantity })
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{product.name}</DialogTitle>
                    <DialogDescription>{product.category}</DialogDescription>
                </DialogHeader>

                <div className="w-full h-64 bg-muted rounded-lg mb-4 flex items-center justify-center relative">
                    {product.image ? (
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover rounded-lg"
                        />
                    ) : (
                        <Coffee className="h-20 w-20 text-muted-foreground" />
                    )}
                </div>

                <p className="text-muted-foreground mb-6">{product.description}</p>

                {/* Счетчик количества */}
                <div className="flex items-center justify-between mb-6">
                    <span className="text-lg font-semibold">Количество:</span>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleDecrement}
                            disabled={quantity <= 1}
                            className="h-10 w-10"
                        >
                            <Minus className="h-4 w-4" />
                        </Button>

                        <span className="text-xl font-bold w-8 text-center">{quantity}</span>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleIncrement}
                            className="h-10 w-10"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-primary">
                        {product.price * quantity} ₽
                    </span>

                    <Button
                        onClick={handleAddToCart}
                        size="lg"
                        className="ml-4"
                    >
                        Добавить в корзину
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}