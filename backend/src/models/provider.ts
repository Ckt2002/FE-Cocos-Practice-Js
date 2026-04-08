export default class Provider {
    id: string;
    name: string;
    address: string;
    phoneNumber: string;

    constructor(
        id: string,
        name: string,
        address: string,
        phoneNumber: string,
    ) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}
