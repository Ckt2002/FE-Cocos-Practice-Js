export default function findBook(booksArr, bookTitle) {
    return booksArr.find(book => book.getTitle() === bookTitle) || null;
}