import type Product from './product.js';
import type PurchaseOrder from './purchase_order.js';

export default class PurchaseOrderDetail {
    id: string;
    idGoodsReceipt: PurchaseOrder;
    idProduct: Product;
    quantity: number;
    price: number;

    constructor(
        id: string,
        idGoodsReceipt: PurchaseOrder,
        idProduct: Product,
        quantity: number,
        price: number,
    ) {
        this.id = id;
        this.idGoodsReceipt = idGoodsReceipt;
        this.idProduct = idProduct;
        this.quantity = quantity;
        this.price = price;
    }
}
