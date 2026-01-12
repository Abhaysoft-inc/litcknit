// GET, UPDATE, DELETE specific post

import { NextRequest, NextResponse } from "next/server";
import dbconnection from "@/config/dbconnection";
import postModel from "@/models/post";

// GET /api/posts/[id] - get a single post
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbconnection();

        const { id } = await params;

        const post = await postModel.findById(id).lean();

        if (!post) {
            return NextResponse.json(
                { success: false, message: "Post not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: post });
    } catch (error: any) {
        console.error("Get post error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Failed to fetch post" },
            { status: 500 }
        );
    }
}

// PATCH /api/posts/[id] - update a post
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbconnection();

        const { id } = await params;
        const body = await req.json();

        const post = await postModel.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!post) {
            return NextResponse.json(
                { success: false, message: "Post not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Post updated successfully",
            data: post,
        });
    } catch (error: any) {
        console.error("Update post error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Failed to update post" },
            { status: 500 }
        );
    }
}

// DELETE /api/posts/[id] - delete a post
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbconnection();

        const { id } = await params;

        const post = await postModel.findByIdAndDelete(id);

        if (!post) {
            return NextResponse.json(
                { success: false, message: "Post not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Post deleted successfully",
        });
    } catch (error: any) {
        console.error("Delete post error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Failed to delete post" },
            { status: 500 }
        );
    }
}
