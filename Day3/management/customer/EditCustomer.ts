import Customer from "../../data/Customer";
import rl from "../../utils/InputManager";
import question from "../../utils/Question";
import SetupTitle from "../../utils/SetupTitle";
import FetchAllCustomers from "./FetchCustomer";
import { FindCustomerByID } from "./FindCustomer";
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

async function EditCustomerForm(callBackToMenu: any, customerData: Customer | undefined, saveCallBack: any): Promise<void> {
    if (!customerData) {
        console.log("Can't find customer. Try again.");
        callBackToMenu();
        return;
    }

    const bookInfo: string[] = [customerData.id, customerData.fullName, customerData.age.toString(), customerData.address];
    SetupTitle(`${customerData.id} - ${customerData.fullName}`, bookInfo);

    const id = await question("Enter ID: ");
    const fullName = await question("Enter full name: ");
    const age = await question("Enter age: ");
    const address = await question("Enter address: ");
    const input = await question('Enter anykey to continue (or 0 to cancel): ');

    if (input !== '0') {
        customerData.applyData(
            id || customerData.id,
            fullName || customerData.fullName,
            +(age || customerData.age.toString()),
            address || customerData.address
        );
    }
    saveCallBack();
    callBackToMenu();
}