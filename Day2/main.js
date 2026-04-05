import SetTitle from './setup_title.js';
import rl from './setup_readline.js';
import editBookMenu from './book_edit.js';
import addBookMenu from './book_add.js';
import removeBookMenu from './book_remove.js';
import showBookMenu from './book_show.js';
import addCustomerMenu from './customer_add.js';
import addBorrowMenu from './borrow_add.js';
import returnBorrowMenu from './borrow_return.js';

function showMainPage() {
    SetTitle("Choose an action", [
        "0-Exit",
        "\nBook Actions:",
        "1-Add new book",
        "2-Edit book",
        "3-Remove book",
        "4-View book",
        "\nCustomer Actions:",
        "5-Add Customer",
        "\nBorrow Actions:",
        "6-Add Borrow"
    ]);

    rl.question('Choose an action: ', (iput) => {
        switch (iput) {
            case '0':
                rl.close();
                break;

            case '1':
                addBookMenu(showMainPage);
                break;
            case '2':
                editBookMenu(showMainPage);
                break;
            case '3':
                removeBookMenu(showMainPage);
                break;
            case '4':
                showBookMenu(showMainPage);
                break;

            case '5':
                addCustomerMenu(showMainPage);
                break;

            case '6':
                addBorrowMenu(showMainPage);
                break;
            case '7':
                returnBorrowMenu(showMainPage);
                break;

            default:
                console.log("Please, enter again!");
                showMainPage();
                break;
        }
    });
}

showMainPage();