'use client'

import { useState } from 'react'
import { Star, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Review {
    id: number
    name: string
    rating: number
    comment: string
    date: string
}

const sampleReviews: Review[] = [
    {
        id: 1,
        name: 'Анна',
        rating: 5,
        comment: 'Очень вкусная шаурма! Быстрая доставка, курьер всегда вежливый.',
        date: '15.01.2024'
    },
    {
        id: 2,
        name: 'Михаил',
        rating: 4,
        comment: 'Качество еды на высоте, обслуживание приятное. Пицца особенно хороша!',
        date: '10.01.2024'
    },
    {
        id: 3,
        name: 'Екатерина',
        rating: 5,
        comment: 'Пицца просто объедение! Заказываем регулярно всей семьей.',
        date: '08.01.2024'
    },
    {
        id: 4,
        name: 'Дмитрий',
        rating: 5,
        comment: 'Лучшие роллы в городе! Всегда свежие и вкусные. Рекомендую!',
        date: '05.01.2024'
    },
    {
        id: 5,
        name: 'Ольга',
        rating: 4,
        comment: 'Вкусные бургеры и картофель фри. Доставка всегда вовремя.',
        date: '03.01.2024'
    },
    {
        id: 6,
        name: 'Сергей',
        rating: 5,
        comment: 'Заказываем здесь уже год. Ни разу не подвели! Качество стабильное.',
        date: '28.12.2023'
    }
]

export default function MapReviews() {
    const [isExpanded, setIsExpanded] = useState(true)
    const [showAll, setShowAll] = useState(false)

    const displayedReviews = showAll ? sampleReviews : sampleReviews.slice(0, 3)

    return (
        <div className="bg-background rounded-lg border border-border shadow-lg p-4 mb-4">
            {/* Заголовок */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Отзывы клиентов</h3>
                    <span className="text-sm text-muted-foreground">({sampleReviews.length})</span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
            </div>

            {/* Список отзывов */}
            {isExpanded && (
                <>
                    <div className="space-y-3">
                        {displayedReviews.map((review) => (
                            <div key={review.id} className="text-sm">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium">{review.name}</span>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3 h-3 ${i < review.rating
                                                        ? 'text-yellow-400 fill-yellow-400'
                                                        : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-muted-foreground mb-1">{review.comment}</p>
                                <span className="text-gray-500 text-xs">{review.date}</span>
                            </div>
                        ))}
                    </div>

                    {/* Кнопка показать еще/свернуть */}
                    {sampleReviews.length > 3 && (
                        <div className="mt-3 pt-3 border-t border-border">
                            <Button
                                variant="link"
                                size="sm"
                                className="text-sm p-0 h-auto font-normal"
                                onClick={() => setShowAll(!showAll)}
                            >
                                {showAll ? (
                                    <>Свернуть ↑</>
                                ) : (
                                    <>Показать еще {sampleReviews.length - 3} отзыва ↓</>
                                )}
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}