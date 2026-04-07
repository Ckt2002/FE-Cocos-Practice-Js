import type CustomerOrder from './customer_order.js';
import type Product from './product.js';
export default class CustomerOrderDetail {
    id: string;
    idCustomerOrder: CustomerOrder;
    idProduct: Product;
    quantity: number;
    price: number;
    constructor(id: string, idCustomerOrder: CustomerOrder, idProduct: Product, quantity: number, price: number);
}
//# sourceMappingURL=customer_order_detail.d.ts.map