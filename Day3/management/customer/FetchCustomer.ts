import AllCustomers from "../../data/AllCustomers";
import Customer from "../../data/Customer";
import { EFileName } from "../../enum/EFileName";
import ReadFile from "../file/Read";

export default function FetchAllCustomers(): AllCustomers {
    const content: any = ReadFile(EFileName.Customer);
    const obj: any = JSON.parse(content);
    const allAvailableCustomers = new AllCustomers();

    for (let customer of obj.customerArr) {
        const newCustomer = new Customer(customer.id,
            customer.fullName,
            customer.age,
            customer.address
        );
        allAvailableCustomers.addNewCustomer(newCustomer);
    }

    return allAvailableCustomers;
}