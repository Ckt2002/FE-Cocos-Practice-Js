import SetTitle from './setup_title.js';
import rl from './setup_readline.js';
import editBookMenu from './edit_book.js';
import addBookMenu from './add_book.js';
import removeBookMenu from './remove_book.js';

function showMainPage() {
    SetTitle("Choose an action", [
        "0-Exit",
        " 1-Add new book",
        " 2-Edit book",
        " 3-Remove book"]);

    rl.question('Chose one action: ', (iput) => {
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

            default:
                console.log("Please, enter again!");
                showMainPage();
                break;
        }
    });
}

showMainPage();