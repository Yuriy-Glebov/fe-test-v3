import {Product} from "./Product"

export type SupermarketCatalog = {
    addProduct: (product: Product, price: number) => void;
    getUnitPrice: (product: Product) => number;
  };