export default class Customer {
    id: string;
    fullName: string;
    age: number;
    address: string;

    constructor(id: string, fullName: string, age: number, address: string) {
        this.id = id;
        this.fullName = fullName;
        this.age = age;
        this.address = address;
    }

    applyData(id: string, fullName: string, age: number, address: string) {
        this.id = id;
        this.fullName = fullName;
        this.age = age;
        this.address = address;
    }
}