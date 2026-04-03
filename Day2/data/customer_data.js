class Customer {
    constructor(name, age, address) {
        this.name = name;
        this.age = age;
        this.address = address
    }

    getInfo() {
        console.log(`${this.name} ${this.age} ${this.address}`);
    }
}