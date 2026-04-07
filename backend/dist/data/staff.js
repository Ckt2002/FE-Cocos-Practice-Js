export default class Staff {
    id;
    staffID;
    fullName;
    age;
    gender;
    address;
    phoneNumber;
    role;
    isWorking;
    constructor(id, staffID, fullName, age, gender, address, phoneNumber, role, isWorking = true) {
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
//# sourceMappingURL=staff.js.map