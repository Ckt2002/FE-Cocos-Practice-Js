import SetTitle from "./utils/setup_title.js";
import fetchAllBooks from "./general_func/fetch_all_book.js";
import rl from "./utils/setup_readline.js";

export default function showBookMenu(callBackToMain) {
    const books = fetchAllBooks();
    const bookArr = books.bookArr;
    const booksName = [];

    for (let index = 0; index < bookArr.length; index++) {
        booksName.push(`"${bookArr[index].id} - ${bookArr[index].title}"`);
    }

    SetTitle("Books", booksName);

    rl.question('Enter 0 to return: ', (input) => {
        if (input === '0')
            callBackToMain();
    });
}