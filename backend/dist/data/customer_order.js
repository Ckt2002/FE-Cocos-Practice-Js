export default class CustomerOrder {
    id;
    idCustomer;
    totalPrice;
    idStaff;
    cancelReason;
    constructor(id, idCustomer, totalPrice, idStaff, cancelReason) {
        this.id = id;
        this.idCustomer = idCustomer;
        this.totalPrice = totalPrice;
        this.idStaff = idStaff;
        this.cancelReason = cancelReason;
    }
}
//# sourceMappingURL=customer_order.js.map