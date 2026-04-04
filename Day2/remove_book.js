import SetTitle from "./setup_title.js";
import fetchAllBooks from "./general_func/fetch_all_book.js";
import findBook from "./general_func/find_book.js";
import saveBook from "./general_func/save_book.js";
import rl from "./setup_readline.js";

export default function removeBookMenu(callBackToMain) {
    const books = fetchAllBooks();
    const bookArr = books.books;
    const booksName = [];

    for (let index = 0; index < bookArr.length; index++) {
        booksName.push(`"${bookArr[index].title}" `);
    }

    SetTitle("Remove book", booksName);

    rl.question('Enter 0 to exit or enter book title to remove: ', (input) => {
        switch (input) {
            case '0':
                callBackToMain();
                break;

            default:
                removeConfirm(
                    () => removeBookMenu(callBackToMain),
                    bookArr,
                    findBook(bookArr, input),
                    () => saveBook(books));
                break;
        }
    });
}

function removeConfirm(callBackToMenu, booksArr, bookData, saveCallBack) {
    if (!bookData) {
        console.log("Can't find book. Try again.");
        callBackToMenu();
        return;
    }

    rl.question('Enter anythings to accept removing or "n" to cancel: ', (input) => {
        switch (input) {
            case 'n':
                callBackToMenu();
                break;

            default:
                const index = booksArr.indexOf(bookData);
                booksArr = booksArr.splice(index, 1);
                saveCallBack();
                callBackToMenu();
                break;
        }
    });
}