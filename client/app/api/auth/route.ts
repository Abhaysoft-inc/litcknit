import { NextResponse } from "next/server";
import connectDB from "@/config/dbconnection";
import User from '@/models/user'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


const JWT_SECRET = process.env.JWT_SECRET as string;

// Login endpoint
export async function POST(req: Request) {
    try {
        if (!JWT_SECRET) {
            console.log("JWT_SECRET not configured")
            return NextResponse.json({
                error: "Internal Server Error"
            })
        }

        await connectDB();

        const { email, password } = await req.json();

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Return user data (excluding password)
        const userObject = user.toObject();

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = userObject;
        const token = await jwt.sign({
            userId: user._id,
            role: user.role
        }, JWT_SECRET, { expiresIn: '7d' });

        const response = NextResponse.json(
            {
                message: "Login successful",
                jwtToken: token,
                user: userWithoutPassword
            },
            { status: 200 }
        );

        // Set secure cookie
        response.cookies.set('adminToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/',
        });

        return response;

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// Logout endpoint
export async function DELETE(req: Request) {
    try {
        const response = NextResponse.json(
            { message: "Logout successful" },
            { status: 200 }
        );

        // Clear the cookie
        response.cookies.set('adminToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 0,
            path: '/',
        });

        return response;
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
