import AllBooks from "../../data/AllBooks";
import Book from "../../data/Book";
import { EFileName } from "../../enum/EFileName";
import ReadFile from "../file/Read";

export default function FetchAllBooks(): AllBooks {
    const content: any = ReadFile(EFileName.Book);
    const obj: any = JSON.parse(content);
    const allAvailableBooks = new AllBooks();

    for (let book of obj.bookArr) {
        const newBook = new Book(book.title,
            book.author,
            book.type,
            book.releaseYear,
            book.bookShelfNumber
        );
        allAvailableBooks.addNewBook(newBook);
    }

    return allAvailableBooks;
}