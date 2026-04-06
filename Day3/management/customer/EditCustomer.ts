import Customer from "../../data/Customer";
import rl from "../../utils/InputManager";
import SetupTitle from "../../utils/SetupTitle";
import FetchAllCustomers from "./FetchCustomer";
import { FindCustomerByID } from "./FIndCustomer";
import SaveCustomer from "./SaveCustomer";

export default function EditCustomerMenu(callBackToMain: any): void {
    const allCustomers = FetchAllCustomers();
    const customerArr = allCustomers.customerArr;
    const customerInfo = [];

    for (let index = 0; index < customerArr.length; index++) {
        const customer = customerArr[index];
        customerInfo.push(`${customer.id}-${customer.fullName}`);
    }

    SetupTitle("Edit customer", customerInfo);

    rl.question('Enter customer ID (or 0 to cancel): ', (input) => {
        if (input !== '0') {
            EditCustomerForm(
                () => EditCustomerMenu(callBackToMain),
                FindCustomerByID(customerArr, input),
                () => SaveCustomer(allCustomers));
            return;
        }
        callBackToMain();
    });
}

function EditCustomerForm(callBackToMenu: any, customerData: Customer | undefined, saveCallBack: any): void {
    if (!customerData) {
        console.log("Can't find customer. Try again.");
        callBackToMenu();
        return;
    }

    const bookInfo: string[] = [customerData.id, customerData.fullName, customerData.age.toString(), customerData.address];
    SetupTitle(`${customerData.id} - ${customerData.fullName}`, bookInfo);

    rl.question("Enter ID:", (id) => {
        rl.question("Enter full name: ", (fullName) => {
            rl.question("Enter age: ", (age) => {
                rl.question("Enter address: ", (address) => {
                    rl.question('Enter anykey to continue (or 0 to cancel): ', (input) => {
                        if (input !== '0') {
                            if (!id || id === '')
                                id = customerData.id;
                            if (!fullName || fullName === '')
                                fullName = customerData.fullName;
                            if (!age || age === '')
                                age = customerData.age.toString();
                            if (!address || address === '')
                                address = customerData.address;

                            customerData.applyData(id, fullName, +age, address);
                        }
                        saveCallBack();
                        callBackToMenu();
                    });
                });
            });
        });
    });
}