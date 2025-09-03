export * from "./products.types";

// Импортируем все массивы товаров
import { hotDrinksProducts } from "./products/hot-drinks";
import { breakfastProducts } from "./products/breakfast";
import { kutabsProducts } from "./products/kutabs";
import { fastfoodProducts } from "./products/fastfood";
import { soupsProducts } from "./products/soups";
import { saladsProducts } from "./products/salads";
import { shashlikProducts } from "./products/shashlik";
import { seasonalProducts } from "./products/seasonal";
import { pizzaProducts } from "./products/pizza";
import { mainCoursesProducts } from "./products/main-courses";
import { friesProducts } from "./products/fries";
import { saucesProducts } from "./products/sauces";

// Объединяем все товары в один массив
export const products = [
  ...hotDrinksProducts,
  ...breakfastProducts,
  ...kutabsProducts,
  ...fastfoodProducts,
  ...soupsProducts,
  ...saladsProducts,
  ...shashlikProducts,
  ...seasonalProducts,
  ...pizzaProducts,
  ...mainCoursesProducts,
  ...friesProducts,
  ...saucesProducts,
];

// Вспомогательная функция для получения товаров по категории
export const getProductsByCategory = (category: string) => {
  return products.filter((product) => product.category === category);
};

// Вспомогательная функция для поиска товаров
export const searchProducts = (query: string) => {
  const searchTerm = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
  );
};
