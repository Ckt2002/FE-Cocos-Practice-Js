import type Role from "./role.js";
import type Staff from "./staff.js";

export default class Account {
    id: string;
    username: string;
    password: string;
    staff: Staff;

    constructor(id: string, username: string, password: string, staff: Staff) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.staff = staff;
    }
}