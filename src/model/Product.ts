import {ProductUnit} from "./ProductUnit"

export type Product = {
    name: string;
    unit: ProductUnit;
}

export function createProduct(name: string, unit: ProductUnit): Product {
    return {
      name,
      unit
    }
  }