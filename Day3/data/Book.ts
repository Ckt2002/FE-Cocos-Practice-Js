export default class Book {
    id: string;
    title: string;
    author: string;
    type: string;
    releaseYear: number;
    bookShelfNumber: number;

    constructor(title: string, author: string, type: string, year: number, bookShelfNumber: number) {
        this.id = "id" + Math.random().toString(8).slice(2);
        this.title = title;
        this.author = author;
        this.type = type;
        this.releaseYear = year;
        this.bookShelfNumber = bookShelfNumber;
    }

    applyData(id: string, title: string, author: string, type: string, year: number, bookShelfNumber: number) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.type = type;
        this.releaseYear = year;
        this.bookShelfNumber = bookShelfNumber;
    }
}