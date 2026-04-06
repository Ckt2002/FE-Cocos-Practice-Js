import AllBooks from "../../data/AllBooks";
import Book from '../../data/Book';
import { EFileName } from "../../enum/EFileName";
import rl from "../../utils/InputManager";
import question from "../../utils/Question";
import SetupTitle from "../../utils/SetupTitle";
import CheckExist from "../file/CheckExitst";
import ReadFile from "../file/Read";
import SaveBook from "./SaveBook";

export default async function AddBookMenu(backToMain: any): Promise<void> {
    SetupTitle("Add new book", null);

    const title = await question('Enter title: ');
    const author = await question('Enter author: ');
    const type = await question('Enter type: ');
    const releaseYear = await question('Enter release year: ');
    const bookshelfNumber = await question('Enter bookshelf number: ');
    const input = await question('Enter anykey to continue (or 0 to cancel): ');

    if (input !== '0') {
        if (!title || title === '' || !author || author === '' || !type || type === '' || !releaseYear || releaseYear === '' || !bookshelfNumber || bookshelfNumber === '') {
            console.log("Please enter all informations.");
            await AddBookMenu(backToMain);
            return;
        }
        addBook(title, author, type, +releaseYear, +bookshelfNumber);
    }
    backToMain();
}

function addBook(title: string, author: string, type: string, releaseYear: number, bookShelfNumber: number): void {
    const newBook: Book = new Book(title, author, type, releaseYear, bookShelfNumber);
    const allBooks: AllBooks = new AllBooks();

    if (CheckExist(EFileName.Book)) {
        const availableData: any = ReadFile(EFileName.Book);
        const allBooksObj: any = JSON.parse(availableData);

        for (let book of allBooksObj.bookArr) {
            if (book.title === title) {
                console.log("Can't add book. Book existed.");
                return;
            }
            const newBook = new Book(
                book.title,
                book.author,
                book.type,
                book.releaseYear,
                book.bookShelfNumber
            );
            allBooks.addNewBook(newBook);
        }
    }
    allBooks.addNewBook(newBook);
    SaveBook(allBooks);
}