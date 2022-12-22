import { Discount } from "./Discount";
import { Product } from "./Product";
import { createReceiptItem, ReceiptItem } from "./ReceiptItem";
import * as _ from "lodash";

export type Receipt = {
  getTotalPrice: () => number;
  addProduct: (
    p: Product,
    quantity: number,
    price: number,
    totalPrice: number
  ) => void;
  getItems: () => ReceiptItem[];
  addDiscount: (discount: Discount) => void;
  getDiscounts: () => Discount[];
};

export function createReceipt() {
  let items: ReceiptItem[] = [];
  let discounts: Discount[] = [];

  return {
    getTotalPrice: function () {
      let total = 0.0;
      for (let item of items) {
        total += item.totalPrice;
      }
      for (let discount of discounts) {
        total -= discount.discountAmount;
      }
      return total;
    },
    addProduct: function (
      p: Product,
      quantity: number,
      price: number,
      totalPrice: number
    ) {
      items.push(createReceiptItem(p, quantity, price, totalPrice));
    },
    getItems: function () {
      return _.clone(items);
    },
    addDiscount: function (discount: Discount) {
      discounts.push(discount);
    },
    getDiscounts: function () {
      return discounts;
    },
  };
}
