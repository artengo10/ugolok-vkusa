export * from "./products.types";

// Импортируем все массивы товаров
import { pizzaProducts } from "./products/pizza";
import { burgersProducts } from "./products/burgers";
import { lavashProducts } from "./products/lavash";
import { hotdogsProducts } from "./products/hotdogs";
import { saladsProducts } from "./products/salads";
import { snacksProducts } from "./products/snacks";
import { soupsProducts } from "./products/soups";
import { rollsProducts } from "./products/rolls";
import { wokProducts } from "./products/wok";
import { dessertsProducts } from "./products/desserts";
import { drinksProducts } from "./products/drinks";
import { saucesProducts } from "./products/sauces";
import { sidesProducts } from "./products/sides";
import { extrasProducts } from "./products/extras";

// Объединяем все товары в один массив
export const products = [
  ...pizzaProducts,
  ...burgersProducts,
  ...lavashProducts,
  ...hotdogsProducts,
  ...saladsProducts,
  ...snacksProducts,
  ...soupsProducts,
  ...rollsProducts,
  ...wokProducts,
  ...dessertsProducts,
  ...drinksProducts,
  ...saucesProducts,
  ...sidesProducts,
  ...extrasProducts,
];
