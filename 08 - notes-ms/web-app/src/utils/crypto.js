import bcrypt from 'bcrypt';
import { PasswordHashingFailure } from '../errors/crypto-errors.js';


const HASH_ROUNDS = 10;


export const hashPassword = async (plainTextPassword) => {
    try {
        const hashedPassword = await bcrypt.hash(plainTextPassword, HASH_ROUNDS);
        return hashedPassword;
    } catch (error) {
        console.log(error.message);
        throw new PasswordHashingFailure()
    }
}

export const verifyPassowrd = async (plainTextPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(plainTextPassword, hashedPassword);
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
