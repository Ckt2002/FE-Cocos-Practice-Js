import SetTitle from "./setup_title.js";
import fetchAllBooks from "./general_func/fetch_all_book.js";
import findBook from "./general_func/find_book.js";
import saveBook from "./general_func/save_book.js";
import rl from "./setup_readline.js";

export default function editBookMenu(callBackToMain) {
    const books = fetchAllBooks();
    const bookArr = books.bookArr;
    const booksName = [];

    for (let index = 0; index < bookArr.length; index++) {
        booksName.push(`"${bookArr[index].title}"`);
    }

    SetTitle("Edit book", booksName);

    rl.question('Enter book title (or 0 to cancel): ', (input) => {
        switch (input) {
            case '0':
                callBackToMain();
                break;

            default:
                editBookForm(
                    () => editBookMenu(callBackToMain),
                    findBook(bookArr, input),
                    () => saveBook(books));
                break;
        }
    });
}

function editBookForm(callBackToMenu, bookData, saveCallBack) {
    if (!bookData) {
        console.log("Can't find book. Try again.");
        callBackToMenu();
        return;
    }

    SetTitle(`${bookData.id} - ${bookData.title}`, null);

    rl.question('Enter new title (or 0 to cancel): ', (input) => {
        switch (input) {
            case '0':
                callBackToMenu();
                break;

            default:
                edit(bookData, input);
                saveCallBack();
                callBackToMenu();
                break;
        }
    });
}

function edit(book, newTitle) {
    book.title = newTitle;
}