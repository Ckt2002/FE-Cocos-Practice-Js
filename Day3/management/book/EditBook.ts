import Book from "../../data/Book";
import rl from "../../utils/InputManager";
import question from "../../utils/Question";
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

    editBookFormAsync(callBackToMenu, bookData, saveCallBack);
}

async function editBookFormAsync(callBackToMenu: any, bookData: Book, saveCallBack: any): Promise<void> {
    const title = await question('Enter title: ');
    const author = await question('Enter author: ');
    const type = await question('Enter type: ');
    const releaseYear = await question('Enter release year: ');
    const bookshelfNumber = await question('Enter bookshelf number: ');
    const input = await question('Enter anykey to continue (or 0 to cancel): ');

    if (input !== '0') {
        bookData.applyData(
            bookData.id,
            title || bookData.title,
            author || bookData.author,
            type || bookData.type,
            +(releaseYear || bookData.releaseYear.toString()),
            +(bookshelfNumber || bookData.bookShelfNumber.toString())
        );
    }
    saveCallBack();
    callBackToMenu();
}