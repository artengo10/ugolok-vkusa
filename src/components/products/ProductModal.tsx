'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Coffee, Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/lib/data'

interface ProductModalProps {
    product: Product | null
    isOpen: boolean
    onClose: () => void
    onAddToCart: (product: Product & { quantity: number }) => void
}

export default function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
    const [quantity, setQuantity] = useState(1)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageError, setImageError] = useState(false)

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

                {/* Увеличиваем контейнер для изображения в модалке */}
                <div className="w-full h-100 bg-muted rounded-lg mb-4 flex items-center justify-center relative">
                    {!imageLoaded && !imageError && (
                        <div className="absolute inset-0 bg-muted-foreground/20 animate-pulse rounded-lg"></div>
                    )}
                    {product.image && !imageError ? (
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain rounded-lg" /* Меняем на object-contain */
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageError(true)}
                            sizes="100vw"
                        />
                    ) : (
                        <Coffee className="h-20 w-20 text-muted-foreground" />
                    )}
                </div>

                <p className="text-muted-foreground mb-2">{product.description}</p>

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