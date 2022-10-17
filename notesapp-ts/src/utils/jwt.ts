import jwt from 'jsonwebtoken';
import { TokenSigningFailure, TokenVerificationFailure } from '../errors/jwt-errors';

const JWT_SECRET_SALT = "VERY_SECRET_SALT_PLEASE_DONT_PUSH_IN_REPO";

export const createToken = async (payload: any) => {
    try {
        return jwt.sign(payload, JWT_SECRET_SALT);
    } catch (error) {
        console.log(error);
        throw new TokenSigningFailure();
    }
}

export const verifyToken = async (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET_SALT);
    } catch (error) {
        console.log(error);
        throw new TokenVerificationFailure();
    }
}