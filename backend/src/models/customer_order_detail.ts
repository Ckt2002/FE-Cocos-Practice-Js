import type CustomerOrder from './customer_order.js';
import type Product from './product.js';

export default class CustomerOrderDetail {
    id: string;
    idCustomerOrder: CustomerOrder;
    idProduct: Product;
    quantity: number;
    price: number;

    constructor(
        id: string,
        idCustomerOrder: CustomerOrder,
        idProduct: Product,
        quantity: number,
        price: number,
    ) {
        this.id = id;
        this.idCustomerOrder = idCustomerOrder;
        this.idProduct = idProduct;
        this.quantity = quantity;
        this.price = price;
    }
}
