import SetTitle from "./utils/setup_title.js";
import rl from "./utils/setup_readline.js";
import Borrow from "./data/borrow_data.js";
import Borrows from "./data/borrows_data.js";
import FileName from "./utils/File_name.js";
import { createNewFile, readFile, checkFile } from "./file_json.js";
import fetchAllBooks from "./general_func/fetch_all_book.js";

export default function addBorrowMenu(callBackToMain) {
    SetTitle("Borrow books", null);

    rl.question('Enter customer ID (or 0 to cancel): ', (customerId) => {
        if (customerId === '0') {
            callBackToMain();
            return;
        }

        selectMultipleBooks(customerId, [], callBackToMain);
    });
}

function selectMultipleBooks(customerId, selectedBookIds, callBackToMain) {
    const books = fetchAllBooks();
    const bookArr = books.bookArr;

    if (bookArr.length === 0) {
        console.log("No books available!");
        callBackToMain();
        return;
    }

    const booksList = bookArr.map(book => `${book.id} - ${book.title}`);
    if (selectedBookIds.length > 0) {
        console.log(`\nBooks selected so far: ${selectedBookIds.length}`);
    }
    SetTitle("Available books", booksList);

    rl.question('Enter book ID or 0 to finish: ', (input) => {
        if (input === '0') {
            if (selectedBookIds.length === 0) {
                console.log("No books selected!");
                callBackToMain();
                return;
            }

            rl.question(`Confirm borrowing ${selectedBookIds.length} book(s)? (y/n): `, (confirm) => {
                if (confirm === 'y') {
                    addMultipleBorrows(customerId, selectedBookIds);
                    console.log(`${selectedBookIds.length} book(s) borrowed!`);
                }
                callBackToMain();
            });
            return;
        }

        const selectedBook = bookArr.find(book => book.id === input);
        if (!selectedBook) {
            console.log("Book not found!");
            selectMultipleBooks(customerId, selectedBookIds, callBackToMain);
            return;
        }

        if (selectedBookIds.includes(input)) {
            console.log("This book is already selected!");
            selectMultipleBooks(customerId, selectedBookIds, callBackToMain);
            return;
        }

        selectedBookIds.push(input);
        console.log(`"${selectedBook.title}" added.`);
        selectMultipleBooks(customerId, selectedBookIds, callBackToMain);
    });
}

function addMultipleBorrows(customerId, bookIds) {
    const borrows = new Borrows();

    if (checkFile(FileName.Borrow)) {
        const content = readFile(FileName.Borrow);
        const obj = JSON.parse(content);

        for (let borrow of obj.borrowArr) {
            const newBorrowObj = new Borrow();
            newBorrowObj.applyData(borrow);
            borrows.addBorrow(newBorrowObj);
        }
    }

    for (let bookId of bookIds) {
        const newBorrow = new Borrow(customerId, bookId);
        borrows.addBorrow(newBorrow);
    }

    const jsonContent = JSON.stringify(borrows, null, '\t');
    createNewFile(FileName.Borrow, jsonContent);
}