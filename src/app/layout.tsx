import { ThemeProvider } from '../components/ui/theme-provider'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import './globals.css'
import { SearchProvider } from '../lib/contexts/search-context'
import { Toaster } from '../components/ui/sonner'
import { Comfortaa } from 'next/font/google'
import FooterMap from '../components/layout/FooterMap'
import AppBanner from '../components/layout/AppBanner'
import JsonLd from '../components/seo/JsonLd'
import Script from 'next/script'

// Настройка шрифта Comfortaa
const comfortaa = Comfortaa({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Уголок Вкуса — шаурма и доставка еды в Сормово, Нижний Новгород',
    template: '%s | Кафе Уголок Вкуса, Нижний Новгород',
  },
  description: 'Кафе Уголок Вкуса на ул. Исполкома 6/2 в Сормовском районе. Шаурма, пицца, шашлык, кутабы — доставка по Нижнему Новгороду и самовывоз. Пн–Чт 10–23, Пт–Сб 10–00, Вс 10–22. Тел: +7 (969) 625-20-20.',
  keywords: [
    'уголок вкуса', 'уголок вкуса 1', 'кафе уголок вкуса',
    'шаурма в сормово', 'шаурма на исполкома', 'шаурма нижний новгород',
    'доставка еды сормово', 'кафе сормово', 'кафе исполкома',
    'доставка шаурмы нижний новгород', 'пицца сормово',
    'шашлык сормово', 'кутабы нижний новгород', 'кафе нижний новгород',
    'доставка еды нижний новгород', 'исполкома 6', 'угловой вкуса',
  ],
  metadataBase: new URL('https://ugolok-vkusa1.ru'),
  alternates: { canonical: 'https://ugolok-vkusa1.ru' },
  openGraph: {
    title: 'Уголок Вкуса — шаурма и доставка еды в Сормово',
    description: 'Шаурма, пицца, шашлык в Сормовском районе. Доставка по Нижнему Новгороду. ул. Исполкома, 6/2.',
    type: 'website',
    url: 'https://ugolok-vkusa1.ru',
    siteName: 'Уголок Вкуса',
    locale: 'ru_RU',
    images: [{ url: '/logo.jpg', width: 800, height: 600, alt: 'Кафе Уголок Вкуса' }],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: { yandex: '39a88c5ba65fe8f6' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={comfortaa.className} suppressHydrationWarning>
      <head><JsonLd /></head>
      <body className="flex flex-col min-h-screen">
        <Script id="yandex-metrika" strategy="afterInteractive">{`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
          ym(97400333,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
        `}</Script>
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SearchProvider>
            <AppBanner />
            <Header />
            <main className="flex-1">{children}</main>
            {/* Добавляем карту на все страницы */}
            <FooterMap />
            <Footer />
            <Toaster />
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}