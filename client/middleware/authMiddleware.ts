import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

export interface DecodedToken {
    userId: string;
    userEmail: string;
    role: string;
}

export const verifyToken = async (req: Request): Promise<{ error?: string; decoded?: DecodedToken }> => {

    if (!JWT_SECRET) {
        return { error: "Internal Server Error" };
    }

    const header = req.headers.get('Authorization') || req.headers.get('authorization');

    if (!header) {
        return { error: "Authorization header missing" };
    }

    const token = header.split(" ")[1];

    if (!token) {
        return { error: "Token missing" };
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
        return { decoded };
    } catch (error) {
        console.error("Token verification error:", error);
        return { error: "Invalid or expired token" };
    }
}