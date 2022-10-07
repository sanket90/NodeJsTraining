import { User } from '../domain/user-entity.js';

import { NotesDB } from '../domain/db.js'
import { AuthenticationError } from '../errors/auth-errors.js';

import { hashPassword, verifyPassowrd } from '../utils/crypto.js'
import { createToken, verifyToken } from '../utils/jwt.js'


export class UsersService {

    db;

    constructor() {
        this.db = new NotesDB();
    }
    

    async save(name, email, password, role) {
        try {
            const newUser = new User(name, email, role);
            newUser.password = await hashPassword(password)
            newUser.id = "USER_"+Date.now()

            return this.db.insertUser(newUser);
        } catch (error) {
            // console.log(error.stack);
            throw error;
        }
    }

    async authenticate(email, password) {
        try {
            const existingUser = await this.db.selectUserByEmail(email, true);

            const isValidPassword = await verifyPassowrd(password, existingUser.password)

            if (!isValidPassword) {
                throw new AuthenticationError();
            }

            const newToken = await createToken({email})
            existingUser.password = ""
            existingUser.token = newToken;

            return existingUser;
        } catch (error) {
            // console.log(error.stack);
            throw new AuthenticationError();
        }
    }

    async tokenAuth(token) {
        try {
            const payload = await verifyToken(token);

            const existingUser = await this.db.selectUserByEmail(payload.email);

            return existingUser;
        } catch (error) {
            console.log(error.message);
            throw new AuthenticationError();
        }
    }

}