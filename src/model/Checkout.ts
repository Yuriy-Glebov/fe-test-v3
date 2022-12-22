import { SupermarketCatalog } from "./SupermarketCatalog";
import { OffersByProduct, ShoppingCart } from "./ShoppingCart";
import { Product } from "./Product";
import { createReceipt, Receipt } from "./Receipt";
import { createOffer } from "./Offer";
import { SpecialOfferType } from "./SpecialOfferType";

export type Checkout = {
  addSpecialOffer: (
    offerType: SpecialOfferType,
    product: Product,
    argument: number
  ) => void;
  checksOutArticlesFrom: (theCart: ShoppingCart) => Receipt;
};

export function createCheckout(catalog: SupermarketCatalog): Checkout {
  const offers: OffersByProduct = {};

  return {
    addSpecialOffer: (
      offerType: SpecialOfferType,
      product: Product,
      argument: number
    ) => {
      offers[product.name] = createOffer(offerType, product, argument);
    },
    checksOutArticlesFrom: (theCart: ShoppingCart): Receipt => {
      const receipt = createReceipt();
      const productQuantities = theCart.getItems();
      for (let pq of productQuantities) {
        let p = pq.product;
        let quantity = pq.quantity;
        let unitPrice = catalog.getUnitPrice(p);
        let price = quantity + unitPrice;
        receipt.addProduct(p, quantity, unitPrice, price);
      }
      theCart.handleOffers(receipt, offers, catalog);

      return receipt;
    },
  };
}
