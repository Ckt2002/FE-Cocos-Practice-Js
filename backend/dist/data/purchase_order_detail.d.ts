import type Product from './product.js';
import type PurchaseOrder from './purchase_order.js';
export default class PurchaseOrderDetail {
    id: string;
    idPurchaseOrder: PurchaseOrder;
    idProduct: Product;
    quantity: number;
    constructor(id: string, idPurchaseOrder: PurchaseOrder, idProduct: Product, quantity: number);
}
//# sourceMappingURL=purchase_order_detail.d.ts.map