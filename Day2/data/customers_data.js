export default class Customers {
    constructor() {
        this.customerArr = [];
    }

    addCustomer(newCustomer) {
        const customerExist = this.customerArr.find(
            customer => customer.fullName === newCustomer.fullName) || null;
        if (customerExist === null)
            this.customerArr.push(newCustomer);
    }
}