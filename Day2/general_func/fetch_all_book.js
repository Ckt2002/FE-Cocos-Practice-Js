import Books from "../data/books_data.js";
import Book from "../data/book_data.js";
import { readFile } from "../file_json.js";

export default function fetchAllBooks() {
    const content = readFile('Books');
    const obj = JSON.parse(content);
    const books = new Books();

    for (let book of obj.books) {
        const newBook = new Book();
        newBook.applyData(book);
        books.addBook(newBook);
    }

    return books;
}