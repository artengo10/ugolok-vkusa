'use client'

interface CategoryFilterProps {
    selectedCategory: string
    onCategoryChange: (category: string) => void
}

const categories = [
    { id: 'all', name: 'Все' },
    { id: 'pizza', name: 'Пицца' },
    { id: 'burgers', name: 'Бургеры' },
    { id: 'lavash', name: 'Лаваши' },
    { id: 'hotdogs', name: 'Хот-Доги' },
    { id: 'salads', name: 'Салаты' },
    { id: 'snacks', name: 'Закуски' },
    { id: 'soups', name: 'Супы' },
    { id: 'rolls', name: 'Роллы' },
    { id: 'wok', name: 'WOK' },
    { id: 'desserts', name: 'Десерты' },
    { id: 'drinks', name: 'Напитки' },
    { id: 'sauces', name: 'Соусы' },
    { id: 'sides', name: 'Гарниры' },
    { id: 'extras', name: 'Дополнительно' },
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