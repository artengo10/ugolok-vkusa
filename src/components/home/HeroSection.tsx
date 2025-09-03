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
                    src="/banner/banner.logo.jpg"
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

            <div className="container relative z-10 px-4">
                <div className="max-w-2xl mx-auto text-center space-y-9 animate-fade-in-up
                               py-8    // ← ОТСТУПЫ ВЕРХ и НИЗ только для мобильных
                               md:py-0 // ← Для планшетов и ПК - БЕЗ отступов">

                    {/* Адрес - добавим отступ снизу только для мобильных */}
                    <p className="text-base sm:text-lg md:text-xl text-white/90 drop-shadow-md
                                 pb-4    // ← Отступ снизу только для мобильных
                                 md:pb-0 // ← Для планшетов и ПК - БЕЗ отступа">
                        ул. Исполкома, 6/2, Нижний Новгород
                    </p>

                    {/* Заголовок - добавим отступ снизу только для мобильных */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white drop-shadow-lg
                                  pb-4    // ← Отступ снизу только для мобильных
                                  md:pb-0 // ← Для планшетов и ПК - БЕЗ отступа">
                        Уголок вкуса №1
                    </h1>

                    {/* Описание */}
                    <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-md
                                 pb-6    // ← Отступ снизу только для мобильных
                                 md:pb-0 // ← Для планшетов и ПК - БЕЗ отступа">
                        - уютное кафе с доставкой в Нижнем Новгороде.
                    </p>

                    {/*Телефоны*/}
            
                    <div className="space-y-2 pb-6 md:pb-0">
                        <a
                            href="tel:+79696252020"
                            className="text-lg sm:text-xl md:text-2xl text-white drop-shadow-md font-semibold hover:text-primary transition-colors block"
                        >
                            +7 (969) 625-20-20
                        </a>
                        <a
                            href="tel:+78312146114"
                            className="text-lg sm:text-xl md:text-2xl text-white drop-shadow-md font-semibold hover:text-primary transition-colors block"
                        >
                            +7 (831) 2-146-114
                        </a>
                    </div>

                    {/* Кнопка CTA */}
                    <div className="pt-4    // ← Отступ сверху только для мобильных
                                  md:pt-0"> {/* ← Для планшетов и ПК - БЕЗ отступа */}
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
                    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 text-sm text-white/90 
                                   pt-1    // ← Отступ сверху только для мобильных
                                   md:pt-0">
                        <div className="flex items-center gap-2 justify-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span className="font-medium">Уютная атмосфера</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span className="font-medium">Запоминающийся вкус</span>
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