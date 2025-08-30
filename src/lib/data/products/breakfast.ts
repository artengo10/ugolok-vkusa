import { Product } from "../products.types";

export const breakfastProducts: Product[] = [
  {
    id: 9,
    name: "Турецкий завтрак",
    price: 650,
    description:
      "Варенье, мёд, оливки, масло, сыр, сосиски, колбаса халяльные, яичница с помидорами, отварные яйца, сметана, помидоры, огурцы, кофе, чай",
    category: "breakfast",
    image: "/images/products/breakfast/turzavtrac.jpg",
  },
  {
    id: 10,
    name: "Яичница",
    price: 170,
    description: "Классическая яичница",
    category: "breakfast",
    image: "/images/products/breakfast/eags_eags.jpg",
    weight: 1200,
    unit: "г",
  },
  {
    id: 11,
    name: "Яичница с помидором",
    price: 220,
    description: "Яичница со свежими помидорами",
    category: "breakfast",
    image: "/images/products/breakfast/eags-tomat.jpg",
    weight: 1200,
    unit: "г",
  },
  {
    id: 12,
    name: "Отварное яйцо",
    price: 150,
    description: "Отварное куриное яйцо",
    category: "breakfast",
    image: "/images/products/breakfast/eags.jpg",
  },
  {
    id: 13,
    name: "Кюкю",
    price: 210,
    description: "Традиционное азербайджанское блюдо из зелени и яиц",
    category: "breakfast",
    image: "/images/products/breakfast/kuku.jpg",
  },
];
