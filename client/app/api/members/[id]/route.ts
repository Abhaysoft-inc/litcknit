// GET, UPDATE & DELETE specific member

import { NextRequest, NextResponse } from "next/server";
import memberModel from "@/models/member";
import dbconnection from "@/config/dbconnection";

// GET /api/members/[id] - Get a specific member
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbconnection();

        const { id } = params;

        const member = await memberModel.findById(id);

        if (!member) {
            return NextResponse.json({
                success: false,
                message: 'Member not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: member
        });

    } catch (error: any) {
        console.error('Get member error:', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Failed to fetch member'
        }, { status: 500 });
    }
}

// PUT /api/members/[id] - Update a member
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbconnection();

        const { id } = params;
        const body = await req.json();

        const member = await memberModel.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!member) {
            return NextResponse.json({
                success: false,
                message: 'Member not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Member updated successfully',
            data: member
        });

    } catch (error: any) {
        console.error('Update member error:', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Failed to update member'
        }, { status: 500 });
    }
}

// DELETE /api/members/[id] - Delete a member
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbconnection();

        const { id } = params;

        const member = await memberModel.findByIdAndDelete(id);

        if (!member) {
            return NextResponse.json({
                success: false,
                message: 'Member not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Member deleted successfully'
        });

    } catch (error: any) {
        console.error('Delete member error:', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Failed to delete member'
        }, { status: 500 });
    }
}
