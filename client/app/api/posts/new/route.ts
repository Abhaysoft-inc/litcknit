import { NextRequest, NextResponse } from "next/server";
import dbconnection from "@/config/dbconnection";
import postModel from "@/models/post";

// POST /api/posts/new - alias for creating a post
export async function POST(req: NextRequest) {
    try {
        await dbconnection();

        const body = await req.json();

        const { title, type, author } = body;

        if (!title || !type || !author) {
            return NextResponse.json(
                {
                    success: false,
                    message: "title, type and author are required",
                },
                { status: 400 }
            );
        }

        const post = await postModel.create(body);

        return NextResponse.json(
            {
                success: true,
                message: "Post created successfully",
                data: post,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Create post (new) error:", error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to create post",
            },
            { status: 500 }
        );
    }
}

