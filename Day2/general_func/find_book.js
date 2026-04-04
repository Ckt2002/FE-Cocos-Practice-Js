export default function findBook(booksArr, bookTitle) {
    for (let book of booksArr) {
        if (book.getTitle() === bookTitle) {
            return book;
        }
    }

    return null;
}