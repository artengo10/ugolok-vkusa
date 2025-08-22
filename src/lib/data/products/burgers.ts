import { Product } from "../products.types";

export const burgersProducts: Product[] = [
  {
    id: 17,
    name: "Классическая шаурма",
    price: 320,
    description:
      "Булочка бриошь, котлета из говядины, сыр чеддер, соус, салат, помидор, соленый огурчик.",
    category: "burgers",
    image: "/images/products/burgers/classic_cheese.jpg",
  },
  {
    id: 18,
    name: "Гриибная шаурма",
    price: 380,
    description: "С жареными шампиньонами, луком и сливочным соусом.",
    category: "burgers",
    image: "/images/products/burgers/mushroom.jpg",
  },
  {
    id: 19,
    name: "Шаурма с индейкой ",
    price: 350,
    description:
      "Диетический вариант с сочной котлетой из индейки и свежими овощами.",
    category: "burgers",
    image: "/images/products/burgers/turkey.jpg",
  },
  {
    id: 20,
    name: "Двойной чизбургер",
    price: 420,
    description: "Две говяжьи котлеты, двойной сыр, бекон и соус.",
    category: "burgers",
    image: "/images/products/burgers/double_cheese.jpg",
  },
  {
    id: 21,
    name: "Чикенбургер",
    price: 300,
    description: "С куриной котлетой в хрустящей панировке и свежими овощами.",
    category: "burgers",
    image: "/images/products/burgers/chicken.jpg",
  },
  {
    id: 22,
    name: "Вегетарианский бургер",
    price: 340,
    description: "С овощной котлетой, авокадо и соусом песто.",
    category: "burgers",
    image: "/images/products/burgers/vegetarian.jpg",
  },
  {
    id: 23,
    name: "Бургер BBQ",
    price: 390,
    description: "С говяжьей котлетой, луком фри и соусом барбекю.",
    category: "burgers",
    image: "/images/products/burgers/bbq.jpg",
  },
];
