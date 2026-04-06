import AllBorrows from "../../data/AllBorrow";
import Borrow from "../../data/Borrow";
import { EFileName } from "../../enum/EFileName";
import rl from "../../utils/InputManager";
import SetupTitle from "../../utils/SetupTitle";
import CheckExist from "../file/CheckExitst";
import ReadFile from "../file/Read";
import SaveBorrow from "./SaveBorrow";

export default function ReturnBorrowMenu(backToMain: any) {
    SetupTitle("Return books", null);

    rl.question('Enter customer ID (or 0 to cancel): ', (input) => {
        if (input === '0') {
            backToMain();
            return;
        }

        displayCustomerBorrows(input, backToMain);
    });
}

function displayCustomerBorrows(customerId: string, callBackToMain: any) {
    if (!CheckExist(EFileName.Borrow)) {
        console.log("No borrow records found!");
        callBackToMain();
        return;
    }

    const content: any = ReadFile(EFileName.Borrow);
    const obj = JSON.parse(content);

    const activeBorrows = new AllBorrows();
    for (let currentBorrow of obj.borrowArr) {
        if (currentBorrow.customerId === customerId && !currentBorrow.returnDate) {
            const borrow = new Borrow(customerId, currentBorrow.bookId, currentBorrow.borrowDate, currentBorrow.id);
            activeBorrows.addNewBorrow(borrow);
        }
    }

    if (activeBorrows.borrowArr.length === 0) {
        console.log("Customer doesn't borrow any books!");
        callBackToMain();
        return;
    }

    const borrowsList = activeBorrows.borrowArr.map(
        borrow => `${borrow.id} - Book ID: ${borrow.bookId} (Borrowed: ${borrow.borrowDate})`
    );

    SetupTitle(`Active borrows for customer (${activeBorrows.borrowArr.length})`, borrowsList);

    selectBorrowsToReturn(customerId, [], activeBorrows.borrowArr, callBackToMain);
}

function selectBorrowsToReturn(customerId: string, selectedBorrowIds: string[], activeBorrowArr: Borrow[], callBackToMain: any) {
    rl.question('Enter borrow ID to return (or 0 to finish): ', (input) => {
        if (input === '0') {
            if (selectedBorrowIds.length === 0) {
                console.log("No books selected for return!");
                callBackToMain();
                return;
            }

            rl.question(`Confirm returning ${selectedBorrowIds.length} book(s)? (y/n): `, (confirm) => {
                if (confirm === 'y') {
                    returnBooks(selectedBorrowIds);
                    console.log(`${selectedBorrowIds.length} book(s) returned.`);
                }
                callBackToMain();
            });
            return;
        }

        const selectedBorrow = activeBorrowArr.find(borrow => borrow.id === input);
        if (!selectedBorrow) {
            console.log("Borrow record not found!");
            selectBorrowsToReturn(customerId, selectedBorrowIds, activeBorrowArr, callBackToMain);
            return;
        }

        if (selectedBorrowIds.includes(input)) {
            console.log("This borrow is already selected!");
            selectBorrowsToReturn(customerId, selectedBorrowIds, activeBorrowArr, callBackToMain);
            return;
        }

        selectedBorrowIds.push(input);
        console.log(`Borrow record added to return list.`);
        selectBorrowsToReturn(customerId, selectedBorrowIds, activeBorrowArr, callBackToMain);
    });
}

function returnBooks(borrowIds: string[]) {
    const borrows = new AllBorrows();
    const content: any = ReadFile(EFileName.Borrow);
    const obj = JSON.parse(content);

    for (let borrow of obj.borrowArr) {
        const borrowObj = new Borrow(borrow.customerId, borrow.bookId, borrow.borrowDate, borrow.id);
        if (borrowIds.includes(borrow.id)) {
            borrowObj.markAsReturned();
        }

        borrows.addNewBorrow(borrowObj);
    }

    SaveBorrow(borrows);
}