import AllCustomers from "../../data/AllCustomers";
import { EFileName } from "../../enum/EFileName";
import WriteFile from "../file/Write";

export default function SaveCustomer(allBooks: AllCustomers): void {
    const jsonContent: string = JSON.stringify(allBooks, null, '\t');
    WriteFile(EFileName.Customer, jsonContent);
}