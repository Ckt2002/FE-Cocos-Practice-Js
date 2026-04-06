import Book from "./Book";

export default class AllBooks {
    bookArr: Book[];

    constructor() {
        this.bookArr = [];
    }

    addNewBook(newBook: Book): void {
        const bookExist = this.bookArr.find(currentBook => currentBook.title === newBook.title) || null;
        if (bookExist === null)
            this.bookArr.push(newBook);
    }
}