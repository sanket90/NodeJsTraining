export class User {
    name;
    email;
    password;
    id;
    token;
    role;

    constructor(name, email, role) {
        this.name = name;
        this.email = email;
        this.role = role;
    }
}