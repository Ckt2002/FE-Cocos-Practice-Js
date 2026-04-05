export default class Borrow {
    constructor(customerId, bookId, borrowDate = new Date().toISOString().split('T')[0]) {
        this.id = "id" + Math.random().toString(16).slice(2);
        this.customerId = customerId;
        this.bookId = bookId;
        this.borrowDate = borrowDate;
        this.returnDate = null;
        this.isReturned = false;
    }

    markAsReturned(returnDate = new Date().toISOString().split('T')[0]) {
        this.returnDate = returnDate;
        this.isReturned = true;
    }

    applyData({ id, customerId, bookId, borrowDate, returnDate, isReturned }) {
        this.id = id;
        this.customerId = customerId;
        this.bookId = bookId;
        this.borrowDate = borrowDate;
        this.returnDate = returnDate;
        this.isReturned = isReturned;
    }
}
