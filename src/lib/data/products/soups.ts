import { Product } from "../products.types";

export const soupsProducts: Product[] = [
  {
    id: 56,
    name: "Борщ",
    price: 200,
    description: "Наваристый борщ со сметаной и зеленью.",
    category: "soups",
    image: "/images/products/soups/borscht.jpg",
  },
  {
    id: 57,
    name: "Куриная лапша",
    price: 180,
    description: "Ароматный куриный суп с домашней лапшой.",
    category: "soups",
    image: "/images/products/soups/chicken_noodle.jpg",
  },
  {
    id: 58,
    name: "Грибной крем-суп",
    price: 220,
    description: "Нежный крем-суп из шампиньонов со сливками.",
    category: "soups",
    image: "/images/products/soups/mushroom_cream.jpg",
  },
  {
    id: 59,
    name: "Солянка",
    price: 240,
    description:
      "Густой наваристый суп с различными видами мяса и солеными огурцами.",
    category: "soups",
    image: "/images/products/soups/solyanka.jpg",
  },
];
