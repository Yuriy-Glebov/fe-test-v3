import {Product} from "./Product"

export type ProductQuantity = {
  product: Product;
  quantity: number;
};

export function createProductQuantity(product: Product, quantity: number): ProductQuantity {
  return {
    product: product,
    quantity: quantity
  }
}