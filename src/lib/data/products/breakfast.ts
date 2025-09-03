import { Product } from "../products.types";

export const breakfastProducts: Product[] = [
  {
    id: 8,
    name: "Яичница",
    price: 170,
    description: "Классическая яичница",
    category: "breakfast",
    image: "/images/products/breakfast/eags_eags.jpg",
    weight: 1200,
    unit: "г",
  },
  {
    id: 9,
    name: "Яичница с помидором",
    price: 220,
    description: "Яичница со свежими помидорами",
    category: "breakfast",
    image: "/images/products/breakfast/eags-tomat.jpg",
    weight: 1200,
    unit: "г",
  },
  {
    id: 10,
    name: "Отварное яйцо",
    price: 150,
    description: "Отварное куриное яйцо",
    category: "breakfast",
    image: "/images/products/breakfast/eags.jpg",
  },
  
];
