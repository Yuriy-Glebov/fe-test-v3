import { createProduct, Product } from "../../src/model/Product";
import { ProductUnit } from "../../src/model/ProductUnit";
import { createReceipt, Receipt } from "../../src/model/Receipt";
import { createDiscount } from "../../src/model/Discount";
import { printStandardReceipt } from "../helper/printStandartReceipt";

describe("ReceiptPrinter", () => {
  let toothbrush: Product;
  let apples: Product;
  let receipt: Receipt;

  beforeEach(() => {
    receipt = createReceipt();
    apples = createProduct("apples", ProductUnit.Kilo);
    toothbrush = createProduct("toothbrush", ProductUnit.Each);
  });

  it("oneLineItem", function (this: any) {
    receipt.addProduct(toothbrush, 1, 0.99, 0.99);
    expect(printStandardReceipt(receipt)).toMatchSnapshot();
  });

  it("quantityTwo", function (this: any) {
    receipt.addProduct(toothbrush, 2, 0.99, 0.99 * 2);
    expect(printStandardReceipt(receipt)).toMatchSnapshot();
  });

  it("looseWeight", function (this: any) {
    receipt.addProduct(apples, 2.3, 1.99, 1.99 * 2.3);
    expect(printStandardReceipt(receipt)).toMatchSnapshot();
  });

  it("total", function (this: any) {
    receipt.addProduct(toothbrush, 1, 0.99, 2 * 0.99);
    receipt.addProduct(apples, 0.75, 1.99, 1.99 * 0.75);
    expect(printStandardReceipt(receipt)).toMatchSnapshot();
  });

  it("discounts", function (this: any) {
    receipt.addDiscount(createDiscount(apples, "3 for 2", 0.99));
    expect(printStandardReceipt(receipt)).toMatchSnapshot();
  });

  it("printWholeReceipt", function (this: any) {
    receipt.addProduct(toothbrush, 1, 0.99, 0.99);
    receipt.addProduct(toothbrush, 2, 0.99, 2 * 0.99);
    receipt.addProduct(apples, 0.75, 1.99, 1.99 * 0.75);
    receipt.addDiscount(createDiscount(toothbrush, "3 for 2", 0.99));
    expect(printStandardReceipt(receipt)).toMatchSnapshot();
  });
});
