import { User } from '../domain/user-entity';

import { NotesDB } from '../domain/db'
import { AuthenticationError } from '../errors/auth-errors';

import { hashPassword, verifyPassowrd } from '../utils/crypto'
import { createToken, verifyToken } from '../utils/jwt'


export class UsersService {

    db;

    constructor() {
        this.db = new NotesDB();
    }
    

    async save(name:string, email:string, password:string, role:string) {
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

    async authenticate(email:string, password:string) {
        try {
            const existingUser = await this.db.selectUserByEmail(email, true);

            if(!existingUser.password) {
                throw new AuthenticationError();
            }
            
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

    async tokenAuth(token: string) {
        try {
            const payload: any = await verifyToken(token);

            const existingUser = await this.db.selectUserByEmail(payload.email);

            return existingUser;
        } catch (error: any) {
            console.log(error.message);
            throw new AuthenticationError();
        }
    }

}