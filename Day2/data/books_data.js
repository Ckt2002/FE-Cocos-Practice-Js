export default class Books {
    constructor() {
        this.books = [];
    }

    addBook(newBook) {
        for (let book of this.books) {
            if (book.getName() === newBook.getName()) {
                return;
            }
        }
        this.books.push(newBook);
    }
}