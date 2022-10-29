import bcrypt from 'bcrypt';
import { PasswordHashingFailure } from '../errors/crypto-errors.js';


export const HASH_ROUNDS = 10;


export const hashPassword = async (plainTextPassword: string) => {
    try {
        const hashedPassword = await bcrypt.hash(plainTextPassword, HASH_ROUNDS);
        return hashedPassword;
    } catch (error: any) {
        console.log(error.message);
        throw new PasswordHashingFailure()
    }
}

export const verifyPassowrd = async (plainTextPassword: string, hashedPassword: string) => {
    try {
        return await bcrypt.compare(plainTextPassword, hashedPassword);
    } catch (error: any) {
        console.log(error.message);
        return false;
    }
}
