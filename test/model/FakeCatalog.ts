import { Product } from "../../src/model/Product";
import { SupermarketCatalog } from "../../src/model/SupermarketCatalog";

export function createFakeCatalog(): SupermarketCatalog {
const products = {};
const prices = {};
  return {
    addProduct: function (product: Product, price: number) {
      products[product.name] = product;
      prices[product.name] = price;
    },
    getUnitPrice: function (p: Product): number {
      return prices[p.name];
    },
  };
}

