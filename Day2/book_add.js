import SetTitle from "./utils/setup_title.js";
import rl from "./utils/setup_readline.js";
import Book from "./data/book_data.js";
import Books from "./data/books_data.js";
import FileName from "./utils/File_name.js";
import { createNewFile, readFile, checkFile } from "./file_json.js";

export default function addBookMenu(callbackToMain) {
    SetTitle("Add new book", null);

    rl.question('Enter book title (or 0 to cancel): ', (input) => {
        if (input !== '0') {
            addBook(input);
        }
        callbackToMain();
    })
}

function addBook(bookName) {
    const newBook = new Book(bookName);
    const books = new Books();

    if (checkFile(FileName.Books)) {
        const content = readFile(FileName.Books);
        const obj = JSON.parse(content);

        for (let book of obj.bookArr) {
            const newBook = new Book();
            newBook.applyData(book);
            books.addBook(newBook);
        }
    }

    books.addBook(newBook);
    const jsonContent = JSON.stringify(books, null, '\t');
    createNewFile(FileName.Books, jsonContent);
}