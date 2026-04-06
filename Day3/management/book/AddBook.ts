import AllBooks from "../../data/AllBooks";
import Book from '../../data/Book';
import { EFileName } from "../../enum/EFileName";
import rl from "../../utils/InputManager";
import SetupTitle from "../../utils/SetupTitle";
import CheckExist from "../file/CheckExitst";
import ReadFile from "../file/Read";
import SaveBook from "./SaveBook";

export default function AddBookMenu(backToMain: any): void {
    SetupTitle("Add new book", null);

    rl.question('Enter title: ', (title) => {
        rl.question('Enter author:', (author) => {
            rl.question('Enter type:', (type) => {
                rl.question('Enter release year:', (releaseYear) => {
                    rl.question('Enter bookshelf number:', (bookshelfNumber) => {
                        rl.question('Enter anykey to continue (or 0 to cancel): ', (input) => {
                            if (input !== '0') {
                                if (!title || title === '' || !author || author === '' || !type || type === '' || !releaseYear || releaseYear === '' || !bookshelfNumber || bookshelfNumber === '') {
                                    console.log("Please enter all informations.");
                                    AddBookMenu(backToMain);
                                    return;
                                }
                                addBook(title, author, type, +releaseYear, +bookshelfNumber);
                            }
                            backToMain();
                        });
                    })
                })
            })
        })
    })
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