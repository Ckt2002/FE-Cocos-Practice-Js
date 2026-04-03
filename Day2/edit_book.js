import SetTitle from "./setup_title.js";
import { createNewFile, readFile } from "./file_json.js";
import Books from "./data/books_data.js";
import Book from "./data/book_data.js";
import rl from "./setup_readline.js";

export default function editBookMenu(callbackToMain) {
    SetTitle("Edit book", [
        "Choose one of those book to edit or enter 0 to return."
    ]);
    const books = fetchAllBooks();
    const booksName = [];

    for (let index = 0; index < books.length; index++) {
        booksName.push(`${books[index].title}. `);
    }

    SetTitle("", booksName);

    rl.question('Enter 0 to return or book title to edit ', (answer) => {
        switch (answer) {
            case '0':
                callbackToMain();
                break;

            default:
                editBookForm(callbackToMain, getBook(books, answer), () => {
                    saveBook(books);
                });
                callbackToMain();
                break;
        }
    });
}

function getBook(books, bookTitle) {
    for (let book of books) {
        if (book.title === bookTitle) {
            return book;
        }
    }

    return null;
}

function saveBook(books) {
    const jsonContent = JSON.stringify(books, null, '\t');
    createNewFile('Books', jsonContent);
}

function fetchAllBooks() {
    const content = readFile('Books');
    const obj = JSON.parse(content);
    const books = new Books();

    for (let book of obj.books) {
        const newBook = new Book();
        newBook.applyData(book);
        books.addBook(newBook);
    }

    return books.books;
}

function editBookForm(callbackToEditMenu, bookData, callback) {

    if (!bookData) {
        console.log("Can't find book. Try again.");
        callbackToEditMenu();
        return;
    }

    SetTitle(`${bookData.title}: ${bookData.id}`);

    rl.question('Enter 0 to return or new title to change book title ', (answer) => {
        switch (answer) {
            case '0':
                callbackToEditMenu();
                break;

            default:
                edit(bookData, answer);
                callback();
                callbackToEditMenu();
                break;
        }
    });
}

function edit(book, newTitle) {
    book.title = newTitle;
}