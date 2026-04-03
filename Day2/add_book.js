import SetTitle from "./setup_title.js";
import rl from "./setup_readline.js";
import Book from "./data/book_data.js";
import Books from "./data/books_data.js";
import { createNewFile, readFile, checkFile } from "./file_json.js";

export default function addBookMenu(callbackToMain) {
    SetTitle("Add new book", ["Enter 0 to return home or enter book name to add new book"]);

    rl.question('Enter 0 or the book name ', (answer) => {
        switch (answer) {
            case '0':
                // Find out how to back to library main
                callbackToMain();
                break;
            default:
                addBook(answer);
                // Save book to json
                callbackToMain();
                break;
        }
    })
}

function addBook(bookName) {
    const newBook = new Book(bookName);
    const books = new Books();

    if (checkFile('Books')) {
        const content = readFile('Books');
        const obj = JSON.parse(content);

        for (let book of obj.books) {
            const newBook = new Book();
            newBook.applyData(book);
            books.addBook(newBook);
        }
    }
    books.addBook(newBook);
    const jsonContent = JSON.stringify(books, null, '\t');
    createNewFile('Books', jsonContent);
}