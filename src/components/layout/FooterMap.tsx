'use client'

import { useEffect, useState } from 'react'
import MapReviews from '@/components/map/MapReviews'

// Интерфейсы для типизации
interface YMaps {
    ready: (callback: () => void) => void
    Map: new (container: string | HTMLElement, options: object) => unknown
    Placemark: new (coordinates: number[], properties: object, options: object) => unknown
    geocode: (address: string) => Promise<unknown>
}

export default function FooterMap() {
    const [isMapsLoaded, setIsMapsLoaded] = useState(false)

    useEffect(() => {
        if ((window as unknown as { ymaps: YMaps }).ymaps) {
            setIsMapsLoaded(true)
            initMap()
            return
        }

        const script = document.createElement('script')
        script.src = 'https://api-maps.yandex.ru/2.1/?apikey=57a04b0e-9c7d-4756-9ae3-7618d0469620&lang=ru_RU'
        script.async = true
        script.onload = () => {
            const ymaps = (window as unknown as { ymaps: YMaps }).ymaps
            ymaps.ready(() => {
                setIsMapsLoaded(true)
                initMap()
            })
        }
        script.onerror = () => {
            console.error('Failed to load Yandex Maps')
        }
        document.head.appendChild(script)
    }, [])

    const initMap = () => {
        const mapContainer = document.getElementById('footer-map')
        const ymaps = (window as unknown as { ymaps: YMaps }).ymaps
        if (!mapContainer || !ymaps) return

        mapContainer.innerHTML = ''

        const map = new ymaps.Map(mapContainer, {
            center: [56.326887, 44.005986],
            zoom: 15,
            controls: ['zoomControl', 'fullscreenControl']
        })

        const placemark = new ymaps.Placemark([56.326887, 44.005986], {
            hintContent: 'Кафе "Уголок Вкуса"',
            balloonContent: `
                <div style="padding: 10px;">
                    <strong>Кафе "Уголок Вкуса"</strong><br/>
                    ул. Исполкома, 6/2, Нижний Новгород<br/>
                    📞 +7 (969) 625-20-20<br/>
                    📞 +7 (831) 2-146-114
                </div>
            `
        }, {
            preset: 'islands#redFoodIcon',
            iconColor: '#ff0000'
        })

        // @ts-ignore
        map.geoObjects.add(placemark)
    }

    return (
        <section className="w-full bg-muted/50 py-8">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-center mb-6">Мы на карте</h2>

                {/* Блок отзывов ПЕРЕД картой */}
                <MapReviews />

                {/* Карта */}
                <div
                    id="footer-map"
                    className="w-full h-64 md:h-80 rounded-lg border border-border bg-background"
                />

                {!isMapsLoaded && (
                    <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg mt-4">
                        <p className="text-muted-foreground">Загрузка карты...</p>
                    </div>
                )}
            </div>
        </section>
    )
}