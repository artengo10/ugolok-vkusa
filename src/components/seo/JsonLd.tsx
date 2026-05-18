export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Restaurant', 'FoodEstablishment'],
    name: 'Кафе Уголок Вкуса',
    alternateName: ['Уголок Вкуса', 'Уголок Вкуса 1'],
    image: 'https://ugolok-vkusa1.ru/logo.jpg',
    '@id': 'https://ugolok-vkusa1.ru',
    url: 'https://ugolok-vkusa1.ru',
    telephone: ['+79696252020', '+78312146114'],
    priceRange: '₽₽',
    servesCuisine: ['Шаурма', 'Пицца', 'Шашлык', 'Кутабы', 'Восточная кухня', 'Азербайджанская кухня'],
    menu: 'https://ugolok-vkusa1.ru/#menu-section',
    hasMenu: 'https://ugolok-vkusa1.ru/#menu-section',
    acceptsReservations: false,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Исполкома, 6/2',
      addressLocality: 'Нижний Новгород',
      addressRegion: 'Нижегородская область',
      postalCode: '603507',
      addressCountry: 'RU',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '10:00',
        closes: '23:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday', 'Saturday'],
        opens: '10:00',
        closes: '00:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '22:00',
      },
    ],
    areaServed: {
      '@type': 'City',
      name: 'Нижний Новгород',
    },
    description: 'Кафе Уголок Вкуса в Сормовском районе Нижнего Новгорода. Вкусная шаурма, пицца, шашлык, кутабы. Быстрая доставка и самовывоз.',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
