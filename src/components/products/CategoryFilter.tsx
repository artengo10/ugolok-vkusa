'use client'

interface CategoryFilterProps {
    selectedCategory: string
    onCategoryChange: (category: string) => void
}

const categories = [
    { id: 'all', name: '🍽 Все' },
    { id: 'fastfood', name: '🌯 Фастфуд' },
    { id: 'pizza', name: '🍕 Пицца' },
    { id: 'shashlik', name: '🍢 Шашлык' },
    { id: 'main-courses', name: '🥘 Горячие блюда' },
    { id: 'soups', name: '🍲 Супы' },
    { id: 'salads', name: '🥗 Салаты' },
    { id: 'kutabs', name: '🫓 Кутабы' },
    { id: 'breakfast', name: '🍳 Завтраки' },
    { id: 'fries', name: '🍟 Фритюр' },
    { id: 'sauces', name: '🫙 Соусы' },
    { id: 'seasonal', name: '🌿 Сезонное' },
    { id: 'hot-drinks', name: '☕ Напитки' },
]

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
    return (
        <div className="mb-8">
            <div className="flex gap-2.5 overflow-x-auto pb-2 px-1 scrollbar-none snap-x">
                {categories.map(category => {
                    const active = selectedCategory === category.id
                    return (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className={`
                                snap-start shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold
                                transition-all duration-200 whitespace-nowrap border
                                ${active
                                    ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                                    : 'bg-card text-foreground border-border hover:border-primary hover:text-primary'
                                }
                            `}
                        >
                            {category.name}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
