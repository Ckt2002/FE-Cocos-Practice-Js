import type Customer from './customer.js';
import type Staff from './staff.js';
export default class CustomerOrder {
    id: string;
    idCustomer: Customer;
    totalPrice: number;
    idStaff: Staff;
    cancelReason: string;
    constructor(id: string, idCustomer: Customer, totalPrice: number, idStaff: Staff, cancelReason: string);
}
//# sourceMappingURL=customer_order.d.ts.map