import SetTitle from "./utils/setup_title.js";
import fetchAllBooks from "./general_func/fetch_all_book.js";
import findBook from "./general_func/find_book.js";
import saveBook from "./general_func/save_book.js";
import rl from "./utils/setup_readline.js";

export default function removeBookMenu(callBackToMain) {
    const books = fetchAllBooks();
    const bookArr = books.bookArr;
    const booksName = [];

    for (let index = 0; index < bookArr.length; index++) {
        booksName.push(`"${bookArr[index].title}"`);
    }

    SetTitle("Remove book", booksName);

    rl.question('Enter book title (or 0 to cancel): ', (input) => {
        if (input !== '0') {
            removeConfirm(
                () => removeBookMenu(callBackToMain),
                bookArr,
                findBook(bookArr, input),
                () => saveBook(books));
        }
        callBackToMain();
    });
}

function removeConfirm(callBackToMenu, booksArr, bookData, saveCallBack) {
    if (!bookData) {
        console.log("Can't find book. Try again.");
        callBackToMenu();
        return;
    }

    rl.question(`Confirm removing ${bookData.title}? (y/n): `, (input) => {
        if (input === 'y') {
            const index = booksArr.indexOf(bookData);
            booksArr = booksArr.splice(index, 1);
            saveCallBack();
        }
        callBackToMenu();
    });
}