import rl from "../../utils/InputManager";
import SetupTitle from "../../utils/SetupTitle";
import FetchAllCustomers from "./FetchCustomer";

export default function ShowAllCustomersMenu(callBackToMain: any): void {
    const customers = FetchAllCustomers();
    const customerArr = customers.customerArr;
    const customersInfo = [];

    for (let index = 0; index < customerArr.length; index++) {
        const customer = customerArr[index];
        customersInfo.push(`id: ${customer.id}\nfull name: ${customer.fullName}\nage: ${customer.age}\naddress: ${customer.address}\n`);
    }

    SetupTitle("All Books", customersInfo);

    rl.question('Enter any key to return: ', (input) => {
        callBackToMain();
    });
}