export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image?: string;
  category: string;
  weight?: number; // вес в граммах
  volume?: number; // объем в мл
  unit?: string; // единица измерения (г, мл, л, порция)
}
