import Book from "../../data/Book";
import rl from "../../utils/InputManager";
import SetupTitle from "../../utils/SetupTitle";
import FetchAllBooks from './FectchBook';
import { FindBookByTitle } from "./FindBook";
import SaveBook from './SaveBook';

export default function EditBookMenu(callBackToMain: any): void {
    const allBooks = FetchAllBooks();
    const bookArr = allBooks.bookArr;
    const booksName = [];

    for (let index = 0; index < bookArr.length; index++) {
        booksName.push(`"${bookArr[index].title}"`);
    }

    SetupTitle("Edit book", booksName);

    rl.question('Enter book title (or 0 to cancel): ', (input) => {
        if (input !== '0') {
            editBookForm(
                () => EditBookMenu(callBackToMain),
                FindBookByTitle(bookArr, input),
                () => SaveBook(allBooks));
            return;
        }
        callBackToMain();
    });
}

function editBookForm(callBackToMenu: any, bookData: Book | undefined, saveCallBack: any): void {
    if (!bookData) {
        console.log("Can't find book. Try again.");
        callBackToMenu();
        return;
    }

    const bookInfo: string[] = [bookData.author, bookData.type, bookData.releaseYear.toString(), bookData.bookShelfNumber.toString()];
    SetupTitle(`${bookData.id} - ${bookData.title}`, bookInfo);

    rl.question('Enter title: ', (title) => {
        rl.question('Enter author:', (author) => {
            rl.question('Enter type:', (type) => {
                rl.question('Enter release year:', (releaseYear) => {
                    rl.question('Enter bookshelf number:', (bookshelfNumber) => {
                        rl.question('Enter anykey to continue (or 0 to cancel): ', (input) => {
                            if (input !== '0') {
                                if (!title || title === '')
                                    title = bookData.title;
                                if (!author || author === '')
                                    author = bookData.author;
                                if (!type || type === '')
                                    type = bookData.type;
                                if (!releaseYear || releaseYear === '')
                                    releaseYear = bookData.releaseYear.toString();
                                if (!bookshelfNumber || bookshelfNumber === '')
                                    bookshelfNumber = bookData.bookShelfNumber.toString();

                                bookData.applyData(bookData.id, title, author, type, +releaseYear, +bookshelfNumber);
                            }
                            saveCallBack();
                            callBackToMenu();
                        });
                    });
                });
            });
        });
    });
}