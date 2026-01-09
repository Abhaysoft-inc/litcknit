// GET all events & CREATE new event

import { NextRequest, NextResponse } from "next/server";
import eventModel from "@/models/event";
import userModel from "@/models/user";
import dbconnection from "@/config/dbconnection";

// GET /api/events - Get all events with optional filters
export async function GET(req: NextRequest) {
    try {
        await dbconnection();

        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');
        const eventType = searchParams.get('eventType');
        const upcoming = searchParams.get('upcoming');

        let query: any = {};

        if (status) {
            query.status = status;
        }

        if (eventType) {
            query.eventType = eventType;
        }

        // Get only upcoming events
        if (upcoming === 'true') {
            query.date = { $gte: new Date() };
            query.status = { $ne: 'Completed' };
        }

        const events = await eventModel
            .find(query)
            .sort({ date: 1 })
            .lean();

        return NextResponse.json({
            success: true,
            count: events.length,
            data: events
        });

    } catch (error: any) {
        console.error('Get events error:', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Failed to fetch events'
        }, { status: 500 });
    }
}

// POST /api/events - Create new event (Admin only)
export async function POST(req: NextRequest) {
    try {
        await dbconnection();

        const body = await req.json();

        // Validate required fields
        const requiredFields = ['name', 'description', 'date', 'time', 'venue', 'maxParticipants', 'registrationDeadline', 'poster', 'rulebook'];

        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json({
                    success: false,
                    message: `${field} is required`
                }, { status: 400 });
            }
        }

        // Validate dates
        const eventDate = new Date(body.date);
        const regDeadline = new Date(body.registrationDeadline);

        if (regDeadline >= eventDate) {
            return NextResponse.json({
                success: false,
                message: 'Registration deadline must be before event date'
            }, { status: 400 });
        }

        // Check for existing event with same name (case-insensitive)
        const existing = await eventModel.findOne({
            name: { $regex: new RegExp(`^${body.name}$`, 'i') }
        });

        if (existing) {
            return NextResponse.json({
                success: false,
                message: 'An event with this name already exists'
            }, { status: 400 });
        }

        // Create event
        const event = await eventModel.create({
            ...body,
            createdBy: body.createdBy || null
        });

        return NextResponse.json({
            success: true,
            message: 'Event created successfully',
            data: event
        }, { status: 201 });

    } catch (error: any) {
        console.error('Create event error:', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Failed to create event'
        }, { status: 500 });
    }
}

