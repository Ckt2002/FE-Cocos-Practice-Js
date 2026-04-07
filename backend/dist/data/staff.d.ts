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
    constructor(id: string, staffID: string, fullName: string, age: number, gender: string, address: string, phoneNumber: string, role: Role, isWorking?: boolean);
}
//# sourceMappingURL=staff.d.ts.map