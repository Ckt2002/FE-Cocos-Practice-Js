import Borrow from './Borrow';
export default class AllBorrows {
    borrowArr: Borrow[];

    constructor() {
        this.borrowArr = [];
    }

    addNewBorrow(newBorrow: Borrow): void {
        this.borrowArr.push(newBorrow);
    }
}
