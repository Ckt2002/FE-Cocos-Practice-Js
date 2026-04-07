export default class Customer {
    public id: string;
    public fullName: string;
    public phoneNumber: string;

    constructor(id: string, fullName: string, phoneNumber: string) {
        this.id = id;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
    }
}
