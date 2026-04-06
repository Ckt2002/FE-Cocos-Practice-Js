import AddBookMenu from "./management/book/AddBook";
import EditBookMenu from "./management/book/EditBook";
import ShowAllBooksMenu from "./management/book/ShowBooks";
import AddBorrowMenu from "./management/borrow/AddBorrow";
import ReturnBorrowMenu from "./management/borrow/ReturnBorrow";
import AddCustomerMenu from "./management/customer/AddCustomer";
import EditCustomerMenu from "./management/customer/EditCustomer";
import ShowAllCustomersMenu from "./management/customer/ShowCustomers";
import rl from "./utils/InputManager";
import SetupTitle from "./utils/SetupTitle";

function Main(): void {
    SetupTitle('Library Management', [
        "0-Exit.",
        "\nBook Management:",
        "1-Add New Book.",
        "2-Edit Book.",
        "3-Show All Books.",
        "\nCustomer Management:",
        "4-Add New Customer",
        "5-Edit Customer",
        "6-Show All Customer",
        "\nBorrow Book Management:",
        "7-Borrow Books.",
        "8-Return Books.",
    ]);

    rl.question('Choose an action: ', (iput) => {
        switch (iput) {
            case '0':
                rl.close();
                break;

            case '1':
                AddBookMenu(Main);
                break;
            case '2':
                EditBookMenu(Main);
                break;
            case '3':
                ShowAllBooksMenu(Main);
                break;

            case '4':
                AddCustomerMenu(Main);
                break;
            case '5':
                EditCustomerMenu(Main);
                break;
            case '6':
                ShowAllCustomersMenu(Main);
                break;

            case '7':
                AddBorrowMenu(Main);
                break;
            case '8':
                ReturnBorrowMenu(Main);
                break;

            default:
                console.log("Please, enter again!");
                Main();
                break;
        }
    });
}

Main();