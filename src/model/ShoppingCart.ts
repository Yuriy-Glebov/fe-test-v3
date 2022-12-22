import { Product } from "./Product";
import { SupermarketCatalog } from "./SupermarketCatalog";
import * as _ from "lodash";
import { createProductQuantity, ProductQuantity } from "./ProductQuantity";
import { createDiscount, Discount } from "./Discount";
import { createReceipt, Receipt } from "./Receipt";
import { Offer } from "./Offer";
import { SpecialOfferType } from "./SpecialOfferType";

type ProductQuantities = { [productName: string]: ProductQuantity };
export type OffersByProduct = { [productName: string]: Offer };

export type ShoppingCart = {
  getItems: () => ProductQuantity[];
  addItem: (product: Product) => void;
  addItemQuantity: (product: Product, quantity: number) => void;
  handleOffers: (
    receipt: Receipt,
    offers: OffersByProduct,
    catalog: SupermarketCatalog
  ) => void;
};

export function createShoppingCart() {
  const items: ProductQuantity[] = [];
  const productQuantities: ProductQuantities = {};

  const addItemQuantity = (product: Product, quantity: number): void => {
    let productQuantity = createProductQuantity(product, quantity);
    items.push(productQuantity);
    let currentQuantity = productQuantities[product.name];
    if (currentQuantity) {
      productQuantities[product.name] = increaseQuantity(
        product,
        currentQuantity,
        quantity
      );
    } else {
      productQuantities[product.name] = productQuantity;
    }
  };

  const increaseQuantity = (
    product: Product,
    productQuantity: ProductQuantity,
    quantity: number
  ) => createProductQuantity(product, productQuantity.quantity + quantity);

  return {
    getItems: (): ProductQuantity[] => {
      return _.clone(items);
    },

    addItem: (product: Product): void => {
      addItemQuantity(product, 1.0);
    },
    addItemQuantity,

    handleOffers: (
      receipt: Receipt,
      offers: OffersByProduct,
      catalog: SupermarketCatalog
    ): void => {
      for (const productName in productQuantities) {
        const productQuantity = productQuantities[productName];
        const product = productQuantity.product;
        const quantity: number = productQuantities[productName].quantity;
        if (offers[productName]) {
          const offer: Offer = offers[productName];
          const unitPrice: number = catalog.getUnitPrice(product);
          let quantityAsInt = quantity;
          let discount: Discount | null = null;
          const x = 1;
          if (offer.offerType == SpecialOfferType.ThreeForTwo) {
            x = 3;
          } else if (offer.offerType == SpecialOfferType.TwoForAmount) {
            x = 2;
            if (quantityAsInt >= 2) {
              const total =
                offer.argument * Math.floor(quantityAsInt / x) +
                (quantityAsInt % 2) * unitPrice;
              const discountN = unitPrice * quantity - total;
              discount = createDiscount(
                product,
                "2 for " + offer.argument,
                discountN
              );
            }
          }
          if (offer.offerType == SpecialOfferType.FiveForAmount) {
            x = 5;
          }
          const numberOfXs = Math.floor(quantityAsInt / x);
          if (
            offer.offerType == SpecialOfferType.ThreeForTwo &&
            quantityAsInt > 2
          ) {
            const discountAmount =
              quantity * unitPrice -
              (numberOfXs * 2 * unitPrice + (quantityAsInt % 3) * unitPrice);
            discount = createDiscount(product, "3 for 2", discountAmount);
          }
          if (offer.offerType == SpecialOfferType.TenPercentDiscount) {
            discount = createDiscount(
              product,
              offer.argument + "% off",
              (quantity * unitPrice * offer.argument) / 100.0
            );
          }
          if (
            offer.offerType == SpecialOfferType.FiveForAmount &&
            quantityAsInt >= 5
          ) {
            const discountTotal =
              unitPrice * quantity -
              (offer.argument * numberOfXs + (quantityAsInt % 5) * unitPrice);
            discount = createDiscount(
              product,
              x + " for " + offer.argument,
              discountTotal
            );
          }
          if (discount != null) receipt.addDiscount(discount);
        }
      }
    },
  };
}
