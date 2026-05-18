'use client'

import { useState, useRef, useEffect } from 'react'
import { HeroSection } from '@/components/home'
import { ProductModal, ProductGrid, CategoryFilter } from '@/components/products'
import { useCartStore } from '@/lib/stores/cart-store'
import { products, Product } from '@/lib/data'
import { useSearch } from '@/lib/contexts/search-context' // Импортируем хук

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const addItem = useCartStore((state) => state.addItem)
  const { selectedProduct, setSelectedProduct } = useSearch() // Используем контекст

  const menuSectionRef = useRef<HTMLDivElement>(null)

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory)

  const scrollToMenu = () => {
    menuSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleAddToCart = (product: Product & { quantity?: number }) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: product.quantity || 1
    })
  }

  // Следим за изменениями selectedProduct из контекста
  useEffect(() => {
    if (selectedProduct) {
      setIsModalOpen(true)
    }
  }, [selectedProduct])

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null) // Сбрасываем при закрытии
  }

  return (
    <>
      <HeroSection onMenuClick={scrollToMenu} />

      <main className="container mx-auto px-4 py-16">
        {/* Секция меню */}
        <section ref={menuSectionRef} id="menu-section" className="text-center mb-5">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">Наше меню</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Шаурма, пицца, шашлык, кутабы — доставка в Сормовском районе и по всему Нижнему Новгороду
          </p>
        </section>

        {/* ЭТОТ БЛОК ОСТАЕТСЯ НА СВОЕМ МЕСТЕ */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* ЭТОТ БЛОК ОСТАЕТСЯ НА СВОЕМ МЕСТЕ */}
        <ProductGrid
          products={filteredProducts}
          onProductSelect={handleProductSelect}
          onAddToCart={handleAddToCart}
        />
      </main>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart} // передаем ту же функцию
      />
    </>
  )
}