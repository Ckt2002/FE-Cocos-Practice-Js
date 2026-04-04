export default class Books {
    constructor() {
        this.books = [];
    }

    addBook(newBook) {
        for (let book of this.books) {
            if (book.getTitle() === newBook.getTitle()) {
                return;
            }
        }
        this.books.push(newBook);
    }
}