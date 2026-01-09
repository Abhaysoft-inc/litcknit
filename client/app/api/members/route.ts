// GET all members & CREATE new member

import { NextRequest, NextResponse } from "next/server";
import memberModel from "@/models/member";
import dbconnection from "@/config/dbconnection";

// GET /api/members - Get all members
export async function GET(req: NextRequest) {
    try {
        await dbconnection();

        const members = await memberModel
            .find()
            .sort({ position: 1, createdAt: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            count: members.length,
            data: members
        });

    } catch (error: any) {
        console.error('Get members error:', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Failed to fetch members'
        }, { status: 500 });
    }
}

// POST /api/members - Create a new member
export async function POST(req: NextRequest) {
    try {
        await dbconnection();

        const body = await req.json();

        // Validate required fields
        const { name, role, year, department } = body;

        if (!name || !role || !year || !department) {
            return NextResponse.json({
                success: false,
                message: 'Name, role, year, and department are required'
            }, { status: 400 });
        }

        // Create new member
        const member = await memberModel.create(body);

        return NextResponse.json({
            success: true,
            message: 'Member created successfully',
            data: member
        }, { status: 201 });

    } catch (error: any) {
        console.error('Create member error:', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Failed to create member'
        }, { status: 500 });
    }
}
