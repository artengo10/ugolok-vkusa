export const metadata = {
  title: 'Политика конфиденциальности — Уголок Вкуса №1',
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Политика конфиденциальности</h1>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <p>Последнее обновление: 18 мая 2026 г.</p>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">1. Общие положения</h2>
          <p>
            Настоящая Политика конфиденциальности описывает, как мобильное приложение
            «Уголок Вкуса 1» (далее — Приложение) собирает, использует и защищает
            персональные данные пользователей.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">2. Какие данные мы собираем</h2>
          <p>При оформлении заказа Приложение запрашивает:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Имя пользователя</li>
            <li>Номер телефона</li>
            <li>Адрес доставки (при выборе доставки)</li>
          </ul>
          <p>
            Приложение не собирает данные геолокации, не использует рекламные трекеры
            и не передаёт данные третьим лицам.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">3. Как мы используем данные</h2>
          <p>Собранные данные используются исключительно для:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Обработки и подтверждения заказа</li>
            <li>Связи с пользователем по вопросам заказа</li>
            <li>Доставки заказа по указанному адресу</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">4. Хранение данных</h2>
          <p>
            Данные о заказах хранятся на защищённых серверах и не передаются третьим
            лицам без согласия пользователя, за исключением случаев, предусмотренных
            законодательством Российской Федерации.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">5. Права пользователя</h2>
          <p>Пользователь вправе:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Запросить удаление своих данных</li>
            <li>Получить информацию о хранимых данных</li>
            <li>Отказаться от использования Приложения в любой момент</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">6. Контакты</h2>
          <p>
            По вопросам конфиденциальности обращайтесь:{' '}
            <a href="mailto:artemklimanov200@gmail.com" className="text-primary underline">
              artemklimanov200@gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
