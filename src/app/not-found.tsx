import MrCornerError from '@/components/ui/mr-corner'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Страница не найдена | Шаурмёнок',
    description: 'Мистер Шаурмёнок сожалеет, но этой страницы не существует. Вернитесь на главную и закажите что-нибудь вкусненькое!',
}

export default function NotFound() {
    return <MrCornerError />
}