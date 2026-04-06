import AllBorrows from "../../data/AllBorrow";
import Borrow from "../../data/Borrow";
import { EFileName } from "../../enum/EFileName";
import rl from "../../utils/InputManager";
import SetupTitle from "../../utils/SetupTitle";
import FetchAllBooks from "../book/FectchBook";
import AddCustomerMenu from "../customer/AddCustomer";
import FetchAllCustomers from "../customer/FetchCustomer";
import { FindCustomerByID } from "../customer/FindCustomer";
import CheckExist from "../file/CheckExitst";
import ReadFile from "../file/Read";
import SaveBorrow from "./SaveBorrow";

export default function AddBorrowMenu(callBackToMain: any) {
    SetupTitle("Borrow books", null);

    rl.question('Enter customer ID (or 0 to cancel): ', (customerId) => {
        if (customerId === '0') {
            callBackToMain();
            return;
        }

        const findCustomer = FindCustomerByID(FetchAllCustomers().customerArr, customerId);
        if (findCustomer) {
            selectMultipleBooks(customerId, [], callBackToMain);
            return;
        }

        rl.question("Customer doesn't exist. Add new customer? (y/n)", (input) => {
            if (input === 'y') {
                AddCustomerMenu(callBackToMain);
                return;
            }
            AddBorrowMenu(callBackToMain);
        });
    });
}

function selectMultipleBooks(customerId: string, selectedBookIds: string[], callBackToMain: any) {
    const books = FetchAllBooks();
    const bookArr = books.bookArr;

    if (bookArr.length === 0 || !bookArr) {
        console.log("No books available!");
        callBackToMain();
        return;
    }

    const booksList = bookArr.map(book => `${book.id} - ${book.title}`);
    if (selectedBookIds.length > 0) {
        console.log(`\nBooks selected so far: ${selectedBookIds.length}`);
    }
    SetupTitle("Available books", booksList);

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

function addMultipleBorrows(customerId: string, bookIds: string[]) {
    const borrows = new AllBorrows();

    if (CheckExist(EFileName.Borrow)) {
        const content: any = ReadFile(EFileName.Borrow);
        const obj = JSON.parse(content);

        for (let borrow of obj.borrowArr) {
            const newBorrowObj = new Borrow(borrow.customerId, borrow.bookId);
            borrows.addNewBorrow(newBorrowObj);
        }
    }

    for (let bookId of bookIds) {
        const newBorrow = new Borrow(customerId, bookId);
        borrows.addNewBorrow(newBorrow);
    }

    SaveBorrow(borrows);
}