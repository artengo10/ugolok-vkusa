import { Product } from "../products.types";

export const breakfastProducts: Product[] = [
  {
    id: 9,
    name: "Турецкий завтрак",
    price: 890,
    description:
      "Варенье, мёд, оливки, масло, сыр, сосиски, колбаса халяльные, яичница с помидорами, отварные яйца, сметана, помидоры, огурцы, кофе, чай",
    category: "breakfast",
    image: "/images/products/breakfast/turzavtrac.jpg",
  },
  {
    id: 10,
    name: "Яичница",
    price: 120,
    description: "Классическая яичница",
    category: "breakfast",
    image: "/images/products/breakfast/eags_eags.jpg",
  },
  {
    id: 11,
    name: "Яичница с помидором",
    price: 150,
    description: "Яичница со свежими помидорами",
    category: "breakfast",
    image: "/images/products/breakfast/eags-tomat.jpg",
  },
  {
    id: 12,
    name: "Отварное яйцо",
    price: 80,
    description: "Отварное куриное яйцо",
    category: "breakfast",
    image: "/images/products/breakfast/eags.jpg",
  },
  {
    id: 13,
    name: "Кюкю",
    price: 200,
    description: "Традиционное азербайджанское блюдо из зелени и яиц",
    category: "breakfast",
    image: "/images/products/breakfast/kuku.jpg",
  },
];
