import rl from "../../utils/InputManager";
import SetupTitle from "../../utils/SetupTitle";
import FetchAllBooks from "./FectchBook";

export default function ShowAllBooksMenu(callBackToMain: any) {
    const books = FetchAllBooks();
    const bookArr = books.bookArr;
    const booksName = [];

    for (let index = 0; index < bookArr.length; index++) {
        const book = bookArr[index];
        booksName.push(`id: ${book.id}\ntitle: ${book.title}\nauthor: ${book.author}\nrelease year: ${book.releaseYear}\nshelf number: ${book.bookShelfNumber}\n`);
    }

    SetupTitle("All Books", booksName);

    rl.question('Enter any key to return: ', (input) => {
        callBackToMain();
    });
}