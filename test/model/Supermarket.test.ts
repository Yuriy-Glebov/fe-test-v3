import { createProduct, Product } from "../../src/model/Product";
import { SupermarketCatalog } from "../../src/model/SupermarketCatalog";
import { createReceipt } from "../../src/model/Receipt";
import { createShoppingCart, ShoppingCart } from "../../src/model/ShoppingCart";
import { SpecialOfferType } from "../../src/model/SpecialOfferType";
import { ProductUnit } from "../../src/model/ProductUnit";
import { printStandardReceipt } from "../helper/printStandartReceipt";
import { Checkout, createCheckout } from "../../src/model/Checkout";
import { createFakeCatalog } from "./FakeCatalog";

describe("Supermarket", function () {
  let catalog: SupermarketCatalog;
  let cashier: Checkout;
  let theCart: ShoppingCart;
  let toothbrush: Product;
  let rice: Product;
  let apples: Product;
  let bananas: Product;
  let cherryTomatoes: Product;

  beforeEach(() => {
    catalog = createFakeCatalog();
    cashier = createCheckout(catalog);
    theCart = createShoppingCart();

    toothbrush = createProduct("toothbrush", ProductUnit.Each);
    catalog.addProduct(toothbrush, 0.99);
    rice = createProduct("rice", ProductUnit.Each);
    catalog.addProduct(rice, 2.99);
    apples = createProduct("apples", ProductUnit.Kilo);
    catalog.addProduct(apples, 1.99);
    bananas = createProduct("bananas", ProductUnit.Each);
    catalog.addProduct(bananas, 0.25);
    cherryTomatoes = createProduct("cherry tomato box", ProductUnit.Each);
    catalog.addProduct(cherryTomatoes, 0.69);
  });

  it("an_empty_shopping_cart_should_cost_nothing", function (this: any) {
    const receipt = cashier.checksOutArticlesFrom(theCart);
    expect(printStandardReceipt(receipt)).toMatchSnapshot();
  });

  it("one_normal_item", function (this: any) {
    theCart.addItem(toothbrush);
    const receipt = cashier.checksOutArticlesFrom(theCart);
    expect(printStandardReceipt(receipt)).toMatchSnapshot();
  });

  it("two_normal_items", function (this: any) {
    theCart.addItem(toothbrush);
    theCart.addItem(rice);
    const receipt = cashier.checksOutArticlesFrom(theCart);
    expect(printStandardReceipt(receipt)).toMatchSnapshot();
  });

  it("buy_two_get_one_free", function (this: any) {
    theCart.addItem(toothbrush);
    theCart.addItem(toothbrush);
    theCart.addItem(toothbrush);
    cashier.addSpecialOffer(
      SpecialOfferType.ThreeForTwo,
      toothbrush,
      catalog.getUnitPrice(toothbrush)
    );
    const receipt = cashier.checksOutArticlesFrom(theCart);
    expect(receipt.getDiscounts().length).toEqual(1);

    expect(printStandardReceipt(receipt)).toMatchSnapshot();
  });

  it("buy_five_get_one_free", function (this: any) {
    theCart.addItem(toothbrush);
    theCart.addItem(toothbrush);
    theCart.addItem(toothbrush);
    theCart.addItem(toothbrush);
    theCart.addItem(toothbrush);
    cashier.addSpecialOffer(
      SpecialOfferType.ThreeForTwo,
      toothbrush,
      catalog.getUnitPrice(toothbrush)
    );
    const receipt = cashier.checksOutArticlesFrom(theCart);
    expect(printStandardReceipt(receipt)).toMatchSnapshot();
  });

  it("loose_weight_product", function (this: any) {
    theCart.addItemQuantity(apples, 0.5);
    const receipt = cashier.checksOutArticlesFrom(theCart);
    expect(printStandardReceipt(receipt)).toMatchSnapshot();
  });

  it("percent_discount", function (this: any) {
    theCart.addItem(rice);
    cashier.addSpecialOffer(SpecialOfferType.TenPercentDiscount, rice, 10.0);
    const receipt = cashier.checksOutArticlesFrom(theCart);
    expect(receipt.getDiscounts().length).toEqual(1);

    expect(printStandardReceipt(receipt)).toMatchSnapshot();
  });

  it("xForY_discount", function (this: any) {
    theCart.addItem(cherryTomatoes);
    theCart.addItem(cherryTomatoes);
    cashier.addSpecialOffer(
      SpecialOfferType.TwoForAmount,
      cherryTomatoes,
      0.99
    );
    const receipt = cashier.checksOutArticlesFrom(theCart);
    expect(receipt.getDiscounts().length).toEqual(1);

    expect(printStandardReceipt(receipt)).toMatchSnapshot();
  });

  it("FiveForY_discount", function (this: any) {
    theCart.addItemQuantity(apples, 5);
    cashier.addSpecialOffer(SpecialOfferType.FiveForAmount, apples, 6.99);
    const receipt = cashier.checksOutArticlesFrom(theCart);
    expect(printStandardReceipt(receipt)).toMatchSnapshot();
  });

  it("FiveForY_discount_withSix", function (this: any) {
    theCart.addItemQuantity(apples, 6);
    cashier.addSpecialOffer(SpecialOfferType.FiveForAmount, apples, 6.99);
    const receipt = cashier.checksOutArticlesFrom(theCart);
    expect(printStandardReceipt(receipt)).toMatchSnapshot();
  });

  it("FiveForY_discount_withSixteen", function (this: any) {
    theCart.addItemQuantity(apples, 16);
    cashier.addSpecialOffer(SpecialOfferType.FiveForAmount, apples, 6.99);
    const receipt = cashier.checksOutArticlesFrom(theCart);
    expect(printStandardReceipt(receipt)).toMatchSnapshot();
  });

  it("FiveForY_discount_withFour", function (this: any) {
    theCart.addItemQuantity(apples, 4);
    cashier.addSpecialOffer(SpecialOfferType.FiveForAmount, apples, 6.99);
    const receipt = cashier.checksOutArticlesFrom(theCart);

    expect(printStandardReceipt(receipt)).toMatchSnapshot();
  });
});
