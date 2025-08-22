'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface HeroSectionProps {
    onMenuClick: () => void
}

export default function HeroSection({ onMenuClick }: HeroSectionProps) {
    return (
        <section className="relative min-h-[600px] md:min-h-[800px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/baner/banner.logo.jpg"
                    alt="Уютное кафе Уголок вкуса"
                    fill
                    className="object-cover scale-125 transform"
                    priority
                    quality={90}
                    style={{ transform: 'scale(1.3) translateY(-5%)' }}
                />
            </div>

            {/* Увеличиваем затемнение для лучшей читаемости */}
            <div className="absolute inset-0 z-1 bg-black/30 dark:bg-black/40" />

            {/* Контент поверх изображения */}
            <div className="container relative z-10 px-4">
                <div className="max-w-2xl mx-auto text-center space-y-9 animate-fade-in-up">
                    {/* Адрес */}
                    <p className="text-base sm:text-lg md:text-xl text-white/90 drop-shadow-md">
                        ул. Исполкома, 6/2, Нижний Новгород
                    </p>

                    {/* Заголовок */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white drop-shadow-lg">
                        Уголок вкуса №1
                    </h1>

                    {/* Описание */}
                    <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-md">
                        - уютное кафе с доставкой в Нижнем Новгороде.
                    </p>

                    {/* Телефоны */}
                    <div className="space-y-2">
                        <p className="text-lg sm:text-xl md:text-2xl text-white drop-shadow-md font-semibold">
                            +7 (969) 625-20-20
                        </p>
                        <p className="text-lg sm:text-xl md:text-2xl text-white drop-shadow-md font-semibold">
                            +7 (831) 2-146-114
                        </p>
                    </div>

                    {/* Кнопка CTA */}
                    <div className="pt-6">
                        <Button
                            size="lg"
                            onClick={onMenuClick}
                            className="text-lg px-8 py-6 
                         bg-white text-foreground 
                         dark:bg-primary dark:text-primary-foreground
                         border-2 border-transparent 
                         hover:border-primary 
                         transition-all
                         hover:bg-white/90 
                         dark:hover:bg-primary/90
                         shadow-2xl"
                        >
                            Смотреть меню
                        </Button>
                    </div>

                    {/* Дополнительная информация */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 text-sm text-white/90 pt-6">
                        <div className="flex items-center gap-2 justify-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span className="font-medium">Уютная атмосфера</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span className="font-medium">Авторские десерты</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span className="font-medium">Быстрая доставка</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}