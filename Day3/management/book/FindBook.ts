import Book from "../../data/Book";

export function FindBookByTitle(bookArr: Book[], title: string): Book | undefined {
    return bookArr.find((element) => element.title === title);
}