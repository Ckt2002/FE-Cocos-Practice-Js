export default class Borrow {
    id: string;
    customerId: string;
    bookId: string;
    borrowDate: string;
    returnDate: string | null;

    constructor(id = "id" + Math.random().toString(16).slice(2), customerId: string, bookId: string, borrowDate = new Date().toISOString().split('T')[0]) {
        this.id = id;
        this.customerId = customerId;
        this.bookId = bookId;
        this.borrowDate = borrowDate;
        this.returnDate = null;
    }

    applyData(id: string, customerId: string, bookId: string, borrowDate = new Date().toISOString().split('T')[0], returnDate = null) {
        this.id = id;
        this.customerId = customerId;
        this.bookId = bookId;
        this.borrowDate = borrowDate;
        this.returnDate = returnDate;
    }

    markAsReturned(): void {
        this.returnDate = new Date().toISOString().split('T')[0];
    }
}
