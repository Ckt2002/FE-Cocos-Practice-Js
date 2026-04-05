import SetTitle from "./setup_title.js";
import rl from "./setup_readline.js";
import Customer from "./data/customer_data.js";
import Customers from "./data/customers_data.js";
import FileName from "./utils/File_name.js";
import { createNewFile, readFile, checkFile } from "./file_json.js";

export default function addCustomerMenu(callBackToMain) {
    SetTitle("Add new customer", null);

    rl.question("Enter full name: ", (fullName) => {
        rl.question("Enter age: ", (age) => {
            rl.question("Enter address: ", (address) => {
                rl.question('Enter anykey to continue (or 0 to cancel): ', (input) => {
                    if (input !== '0')
                        addCustomer(fullName, age, address);
                    callBackToMain();
                })
            })
        });
    });
}

function addCustomer(fullName, age, address) {
    const newCus = new Customer(fullName, age, address);
    const customers = new Customers();

    if (checkFile(FileName.Customer)) {
        const content = readFile(FileName.Customer);
        const obj = JSON.parse(content);

        for (let customer of obj.customerArr) {
            const newCustomer = new Customer();
            newCustomer.applyData(customer);
            customers.addCustomer(newCustomer);
        }
    }

    customers.addCustomer(newCus);
    const jsonContent = JSON.stringify(customers, null, '\t');
    createNewFile(FileName.Customer, jsonContent);
}