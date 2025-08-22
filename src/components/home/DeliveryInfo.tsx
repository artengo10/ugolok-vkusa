export default function DeliveryInfo() {
    return (
        <section className="mb-12 text-center">
            <div className="bg-muted/50 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-heading font-bold mb-4">Быстрая доставка</h3>
                <p className="text-muted-foreground mb-6">
                    Закажите от 1000₽ и получите бесплатную доставку по городу
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-sm">
                    <div className="flex items-center gap-2 justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Доставка 30-60 минут</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Самовывоз из кафе</span>
                    </div>
                </div>
            </div>
        </section>
    )
}