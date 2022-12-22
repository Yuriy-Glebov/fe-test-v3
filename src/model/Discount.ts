import {Product} from "./Product"

export type Discount = {
  product: Product;
  description: string;
  discountAmount: number;
};

export function createDiscount(product: Product, description: string, discountAmount: number): Discount {
  return {
    product: product,
    description: description,
    discountAmount: discountAmount
  }
}