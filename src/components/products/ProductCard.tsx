'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Coffee } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/lib/data/products.types'

interface ProductCardProps {
    product: Product
    onSelect: (product: Product) => void
    onAddToCart: (product: Product & { quantity?: number }) => void
}

export default function ProductCard({ product, onSelect, onAddToCart }: ProductCardProps) {
    const [quantity, setQuantity] = useState(1)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageError, setImageError] = useState(false)

    const handleAddToCartClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        onAddToCart({ ...product, quantity })
    }

    const handleIncrement = (e: React.MouseEvent) => {
        e.stopPropagation()
        setQuantity(prev => prev + 1)
    }

    const handleDecrement = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    // Функция для отображения объема/веса
    const renderSizeInfo = () => {
        if (product.volume && product.unit) {
            return `${product.volume} ${product.unit}`
        }
        if (product.weight && product.unit) {
            return `${product.weight} ${product.unit}`
        }
        return null
    }

    return (
        <Card
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] h-full flex flex-col"
            onClick={() => onSelect(product)}
        >
            <CardHeader className="p-2 flex-1">
                {/*  контейнер для изображения */}
                <div className="w-full h-40 sm:h-65 md:h-85 bg-muted rounded-lg mb-3 flex items-center justify-center relative">
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
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                    ) : (
                        <Coffee className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-muted-foreground" />
                    )}
                </div>

                {/* Уменьшаем отступы у текста чтобы компенсировать увеличение изображения */}
                <CardTitle className="text-sm sm:text-base font-semibold leading-tight line-clamp-2 h-5 mt-0">
                    {product.name}
                </CardTitle>
                {/* Отображение объема/веса */}
                {renderSizeInfo() && (
                    <div className="text-xs text-muted-foreground mt-1">
                        {renderSizeInfo()}
                    </div>
                )}
                <CardDescription className="text-xs sm:text-sm line-clamp-2 h-5">
                    {product.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="p-3 pt-0">
                <div className="flex flex-col gap-2">
                    {/* Цена */}
                    <div className="flex justify-between items-center">
                        <span className="text-base sm:text-lg md:text-xl font-bold text-primary">
                            {product.price} ₽
                        </span>
                    </div>

                    {/* Счетчик и кнопка */}
                    <div className="flex flex-col gap-2">
                        {/* Счетчик + и - */}
                        <div className="flex items-center justify-between bg-muted rounded-lg p-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-sm font-bold"
                                onClick={handleDecrement}
                            >
                                -
                            </Button>

                            <span className="text-sm sm:text-base font-semibold min-w-[2rem] text-center">
                                {quantity}
                            </span>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-sm font-bold"
                                onClick={handleIncrement}
                            >
                                +
                            </Button>
                        </div>

                        {/* Кнопка Выбрать */}
                        <Button
                            onClick={handleAddToCartClick}
                            size="sm"
                            className="w-full text-xs sm:text-sm h-8 sm:h-9 font-medium"
                        >
                            Выбрать
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}