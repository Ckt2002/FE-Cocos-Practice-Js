import SetTitle from "./utils/setup_title.js";
import rl from "./utils/setup_readline.js";
import Borrow from "./data/borrow_data.js";
import Borrows from "./data/borrows_data.js";
import FileName from "./utils/File_name.js";
import { createNewFile, readFile, checkFile } from "./file_json.js";

export default function returnBorrowMenu(callBackToMain) {
    SetTitle("Return books", null);

    rl.question('Enter customer ID (or 0 to cancel): ', (input) => {
        if (input === '0') {
            callBackToMain();
            return;
        }

        displayCustomerBorrows(input, callBackToMain);
    });
}

function displayCustomerBorrows(customerId, callBackToMain) {
    if (!checkFile(FileName.Borrow)) {
        console.log("No borrow records found!");
        callBackToMain();
        return;
    }

    const content = readFile(FileName.Borrow);
    const obj = JSON.parse(content);

    const activeBorrows = obj.borrowArr.filter(
        borrow => borrow.customerId === customerId && !borrow.isReturned
    );

    if (activeBorrows.length === 0) {
        console.log("No active borrows for this customer!");
        callBackToMain();
        return;
    }

    const borrowsList = activeBorrows.map(
        borrow => `${borrow.id} - Book ID: ${borrow.bookId} (Borrowed: ${borrow.borrowDate})`
    );

    SetTitle(`Active borrows for customer (${activeBorrows.length})`, borrowsList);

    selectBorrowsToReturn(customerId, [], activeBorrows, callBackToMain);
}

function selectBorrowsToReturn(customerId, selectedBorrowIds, activeBorrows, callBackToMain) {
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

        const selectedBorrow = activeBorrows.find(borrow => borrow.id === input);
        if (!selectedBorrow) {
            console.log("Borrow record not found!");
            selectBorrowsToReturn(customerId, selectedBorrowIds, activeBorrows, callBackToMain);
            return;
        }

        if (selectedBorrowIds.includes(input)) {
            console.log("This borrow is already selected!");
            selectBorrowsToReturn(customerId, selectedBorrowIds, activeBorrows, callBackToMain);
            return;
        }

        selectedBorrowIds.push(input);
        console.log(`Borrow record added to return list.`);
        selectBorrowsToReturn(customerId, selectedBorrowIds, activeBorrows, callBackToMain);
    });
}

function returnBooks(borrowIds) {
    const borrows = new Borrows();

    const content = readFile(FileName.Borrow);
    const obj = JSON.parse(content);

    for (let borrow of obj.borrowArr) {
        const borrowObj = new Borrow();
        borrowObj.applyData(borrow);

        if (borrowIds.includes(borrow.id)) {
            borrowObj.markAsReturned();
        }

        borrows.addBorrow(borrowObj);
    }

    const jsonContent = JSON.stringify(borrows, null, '\t');
    createNewFile(FileName.Borrow, jsonContent);
}
