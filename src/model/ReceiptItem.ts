import {Product} from "./Product"

export type ReceiptItem = {
  product: Product;
  quantity: number;
  price: number;
  totalPrice: number;
};


export function createReceiptItem(product: Product, quantity: number, price: number, totalPrice: number): ReceiptItem {
    return {
      product: product,
      quantity: quantity,
      price: price,
      totalPrice: totalPrice
    }
  }