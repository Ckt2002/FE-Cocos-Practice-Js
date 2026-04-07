import type Role from './role.js';

export default class Staff {
    id: string;
    staffID: string;
    fullName: string;
    age: number;
    gender: string;
    address: string;
    phoneNumber: string;
    role: Role;
    isWorking: boolean;

    constructor(
        id: string,
        staffID: string,
        fullName: string,
        age: number,
        gender: string,
        address: string,
        phoneNumber: string,
        role: Role,
        isWorking: boolean = true,
    ) {
        this.id = id;
        this.staffID = staffID;
        this.fullName = fullName;
        this.age = age;
        this.gender = gender;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.isWorking = isWorking;
    }
}
