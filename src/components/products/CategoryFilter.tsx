'use client'

interface CategoryFilterProps {
    selectedCategory: string
    onCategoryChange: (category: string) => void
}

const categories = [
    { id: 'all', name: 'Все' },
    { id: 'hot-drinks', name: 'Горячие напитки' },
    { id: 'breakfast', name: 'Завтраки' },
    { id: 'kutabs', name: 'Кутабы' },
    { id: 'fastfood', name: 'Фастфуд' },
    { id: 'soups', name: 'Супы' },
    { id: 'salads', name: 'Салаты' },
    { id: 'shashlik', name: 'Шашлык' },
    { id: 'seasonal', name: 'Сезонные блюда' },
    { id: 'pizza', name: 'Пицца' },
    { id: 'main-courses', name: 'Горячие блюда' },
    { id: 'garnishes', name: 'Гарниры' },
    { id: 'fries', name: 'Фритюр' },
    { id: 'sauces', name: 'Соусы' }
]

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap justify-center gap-2 mb-8 px-2">
            {categories.map(category => (
                <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`px-3 py-2 rounded-full text-xs sm:text-sm transition-colors whitespace-nowrap ${selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground'
                        }`}
                >
                    {category.name}
                </button>
            ))}
        </div>
    )
}