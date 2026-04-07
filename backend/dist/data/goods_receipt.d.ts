import type Provider from './provider.js';
import type Staff from './staff.js';
export default class GoodsReceipt {
    id: string;
    createdDate: Date;
    totalPrice: number;
    idStaff: Staff;
    idProvider: Provider;
    constructor(id: string, createdDate: Date, totalPrice: number, idStaff: Staff, idProvider: Provider);
}
//# sourceMappingURL=goods_receipt.d.ts.map