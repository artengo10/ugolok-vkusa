import { Product } from "../products.types";

export const lavashProducts: Product[] = [
  {
    id: 24,
    name: "Лаваш классический",
    price: 320,
    description:
      "С курицей, свежими овощами и соусом в тонком армянском лаваше.",
    category: "lavash",
    image: "/images/products/lavash/classic.jpg",
  },
  {
    id: 25,
    name: "Лаваш острый",
    price: 350,
    description: "С острой курицей, перцем халапеньо и острым соусом.",
    category: "lavash",
    image: "/images/products/lavash/spicy.jpg",
  },
  {
    id: 26,
    name: "Лаваш с сыром",
    price: 370,
    description: "С курицей, сыром сулугуни и соусом.",
    category: "lavash",
    image: "/images/products/lavash/cheese.jpg",
  },
  {
    id: 27,
    name: "Лаваш терияки",
    price: 360,
    description: "С курицей в соусе терияки и свежими овощами.",
    category: "lavash",
    image: "/images/products/lavash/teriyaki.jpg",
  },
  {
    id: 28,
    name: "Лаваш вегетарианский",
    price: 300,
    description: "С свежими овощами, зеленью и соусом.",
    category: "lavash",
    image: "/images/products/lavash/vegetarian.jpg",
  },
  {
    id: 29,
    name: "Лаваш большой",
    price: 420,
    description: "Увеличенная порция с двойной начинкой.",
    category: "lavash",
    image: "/images/products/lavash/large.jpg",
  },
];
