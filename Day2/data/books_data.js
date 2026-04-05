export default class Books {
    constructor() {
        this.bookArr = [];
    }

    addBook(newBook) {
        const bookExist = this.bookArr.find(book => book.getTitle() === newBook.getTitle()) || null;
        if (bookExist === null)
            this.bookArr.push(newBook);
    }
}