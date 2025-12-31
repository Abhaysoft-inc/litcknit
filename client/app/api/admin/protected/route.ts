import { NextResponse } from "next/server";
import { verifyToken } from "@/middleware/authMiddleware";

// Example protected endpoint - only accessible with valid JWT
export async function GET(req: Request) {
    try {
        // Verify the token
        const { error, decoded } = await verifyToken(req);

        // If token verification failed, return error
        if (error || !decoded) {
            return NextResponse.json(
                { error: error || "Unauthorized" },
                { status: 401 }
            );
        }

        // Token is valid - proceed with protected logic
        // You can access user info from decoded token
        const { userId, userEmail } = decoded;

        return NextResponse.json(
            {
                message: "Access granted to protected resource",
                user: { userId, userEmail }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Protected route error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// Example protected POST endpoint
export async function POST(req: Request) {
    try {
        // Verify the token
        const { error, decoded } = await verifyToken(req);

        if (error || !decoded) {
            return NextResponse.json(
                { error: error || "Unauthorized" },
                { status: 401 }
            );
        }

        // Get request body
        const body = await req.json();

        // Your protected logic here
        // You have access to decoded.userId and decoded.userEmail

        return NextResponse.json(
            {
                message: "Protected POST successful",
                userId: decoded.userId,
                userEmail: decoded.userEmail
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Protected route error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
