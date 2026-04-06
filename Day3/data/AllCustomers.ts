import Customer from "./Customer";

export default class AllCustomers {
    customerArr: Customer[];

    constructor() {
        this.customerArr = [];
    }

    addNewCustomer(newCustomer: Customer): void {
        const customerExist = this.customerArr.find(customer => customer.id === newCustomer.id) || null;
        if (customerExist === null) {
            this.customerArr.push(newCustomer);
        }
    }
}