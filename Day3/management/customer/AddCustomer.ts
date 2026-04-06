import AllCustomers from "../../data/AllCustomers";
import Customer from "../../data/Customer";
import { EFileName } from "../../enum/EFileName";
import rl from "../../utils/InputManager";
import question from "../../utils/Question";
import SetupTitle from "../../utils/SetupTitle";
import CheckExist from "../file/CheckExitst";
import ReadFile from "../file/Read";
import WriteFile from "../file/Write";


export default function AddCustomerMenu(backToMain: any): void {
    AddCustomerMenuAsync(backToMain);
}

async function AddCustomerMenuAsync(backToMain: any): Promise<void> {
    SetupTitle("Add new customer", null);

    const id = await question("Enter ID: ");
    const fullName = await question("Enter full name: ");
    const age = await question("Enter age: ");
    const address = await question("Enter address: ");
    const input = await question('Enter anykey to continue (or 0 to cancel): ');

    if (input !== '0') {
        if (!id || id === '' || !fullName || fullName === '' || !age || age === '' || !address || address === '') {
            console.log("Please enter all informations.");
            await AddCustomerMenuAsync(backToMain);
            return;
        }
        addCustomer(id, fullName, +age, address);
    }
    backToMain();
}

function addCustomer(id: string, fullName: string, age: number, address: string): void {
    const newCus = new Customer(id, fullName, age, address);
    const allCustomers = new AllCustomers();

    if (CheckExist(EFileName.Customer)) {
        const content: any = ReadFile(EFileName.Customer);
        const obj = JSON.parse(content);

        for (let customer of obj.customerArr) {
            if (customer.id === id) {
                console.log("Can't add customer. Customer existed.");
                return;
            }
            const currentCustomer = new Customer(customer.id, customer.fullName, customer.age, customer.address);
            allCustomers.addNewCustomer(currentCustomer);
        }
    }

    allCustomers.addNewCustomer(newCus);
    const jsonContent = JSON.stringify(allCustomers, null, '\t');
    WriteFile(EFileName.Customer, jsonContent);
}