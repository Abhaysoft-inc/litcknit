import { NextRequest, NextResponse } from "next/server";
import dbconnection from "@/config/dbconnection";
import postModel from "@/models/post";

// GET /api/posts - list posts with optional filters
export async function GET(req: NextRequest) {
    try {
        await dbconnection();

        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status"); // draft | published | archived
        const type = searchParams.get("type");     // blog | story | shayari | poem

        const query: any = {};

        if (status) {
            query.status = status;
        }

        if (type) {
            query.type = type;
        }

        const posts = await postModel
            .find(query)
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            count: posts.length,
            data: posts,
        });
    } catch (error: any) {
        console.error("Get posts error:", error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to fetch posts",
            },
            { status: 500 }
        );
    }
}

// POST /api/posts - create a new post (admin)
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
        console.error("Create post error:", error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to create post",
            },
            { status: 500 }
        );
    }
}

