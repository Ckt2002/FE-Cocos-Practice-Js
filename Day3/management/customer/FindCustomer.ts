import Customer from "../../data/Customer";

export function FindCustomerByID(bookArr: Customer[], id: string): Customer | undefined {
    return bookArr.find((element) => element.id === id);
}