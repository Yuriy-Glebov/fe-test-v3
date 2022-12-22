import {Product} from "./Product"

export class SupermarketCatalog {
    private products: {[key: string]: Product} = {};
    private prices: {[key: string]: number} = {};

    public addProduct(product: Product, price: number): void {
        this.products[product.name] = product;
        this.prices[product.name] = price;
    }

    public getUnitPrice(p: Product): number {
        return this.prices[p.name];
    }
}
