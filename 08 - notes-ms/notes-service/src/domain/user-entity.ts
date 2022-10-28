export class User {
    name: string;
    email: string;
    password?: string;
    id?: string;
    token?: string;
    role: string;

    constructor(name: string, email: string, role: string) {
        this.name = name;
        this.email = email;
        this.role = role;
    }
}