'use client'

interface CartTabsProps {
    value: string
    onValueChange: (value: string) => void
}

export default function CartTabs({ value, onValueChange }: CartTabsProps) {
    return (
        <div className="flex gap-1 p-1 rounded-xl" style={{ backgroundColor: 'oklch(0.55 0.12 55.7 / 0.15)' }}>
            {(['delivery', 'pickup'] as const).map((type) => {
                const active = value === type
                return (
                    <button
                        key={type}
                        onClick={() => onValueChange(type)}
                        className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
                        style={active
                            ? { backgroundColor: 'oklch(0.55 0.12 55.7)', color: '#fff' }
                            : { backgroundColor: 'transparent', color: 'oklch(0.55 0.12 55.7)' }
                        }
                    >
                        {type === 'delivery' ? '🚚 Доставка' : '🏠 Самовывоз'}
                    </button>
                )
            })}
        </div>
    )
}
