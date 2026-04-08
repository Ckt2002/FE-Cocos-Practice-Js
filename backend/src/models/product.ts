import type Brand from './brand.js';
import type Color from './color.js';
import type ProductType from './product_type.js';
import type Size from './size.js';

export default class Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
    color: Color;
    type: ProductType;
    brand: Brand;
    size: Size;

    constructor(
        id: string,
        name: string,
        price: number,
        quantity: number,
        color: Color,
        type: ProductType,
        brand: Brand,
        size: Size,
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.color = color;
        this.type = type;
        this.brand = brand;
        this.size = size;
    }
}
