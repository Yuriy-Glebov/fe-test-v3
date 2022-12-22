import {Product} from "./Product"
import {SpecialOfferType} from "./SpecialOfferType"

export type Offer = {
    offerType: SpecialOfferType,
    product: Product,
    argument: number,
    getProduct: () => Product,
};

export const createOffer = (offerType: SpecialOfferType, product: Product, argument: number): Offer => {
    return {
        offerType,
        product,
        argument,
        getProduct: () => product,
    };
};
