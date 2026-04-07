import type Product from './product.js';
import type PurchaseOrder from './purchase_order.js';

export default class PurchaseOrderDetail {
    id: string;
    idPurchaseOrder: PurchaseOrder;
    idProduct: Product;
    quantity: number;

    constructor(
        id: string,
        idPurchaseOrder: PurchaseOrder,
        idProduct: Product,
        quantity: number,
    ) {
        this.id = id;
        this.idPurchaseOrder = idPurchaseOrder;
        this.idProduct = idProduct;
        this.quantity = quantity;
    }
}
