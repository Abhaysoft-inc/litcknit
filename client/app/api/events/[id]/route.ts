// GET, UPDATE, DELETE specific event

import { NextRequest, NextResponse } from "next/server";
import eventModel from "@/models/event";
import dbconnection from "@/config/dbconnection";

// GET /api/events/[id] - Get single event
export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await dbconnection();

        const { id } = await context.params;

        const event = await eventModel
            .findById(id)

            .lean();

        if (!event) {
            return NextResponse.json({
                success: false,
                message: 'Event not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: event
        });

    } catch (error: any) {
        console.error('Get event error:', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Failed to fetch event'
        }, { status: 500 });
    }
}

// PATCH /api/events/[id] - Update event (Admin only)
export async function PATCH(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await dbconnection();

        const body = await req.json();

        const { id } = await context.params;

        // Validate dates if provided
        if (body.date && body.registrationDeadline) {
            const eventDate = new Date(body.date);
            const regDeadline = new Date(body.registrationDeadline);

            if (regDeadline >= eventDate) {
                return NextResponse.json({
                    success: false,
                    message: 'Registration deadline must be before event date'
                }, { status: 400 });
            }
        }

        const event = await eventModel
            .findByIdAndUpdate(
                id,
                { $set: body },
                { new: true, runValidators: true }
            )


        if (!event) {
            return NextResponse.json({
                success: false,
                message: 'Event not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Event updated successfully',
            data: event
        });

    } catch (error: any) {
        console.error('Update event error:', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Failed to update event'
        }, { status: 500 });
    }
}

// DELETE /api/events/[id] - Delete event (Admin only)
export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await dbconnection();

        const { id } = await context.params;

        const event = await eventModel.findByIdAndDelete(id);

        if (!event) {
            return NextResponse.json({
                success: false,
                message: 'Event not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Event deleted successfully'
        });

    } catch (error: any) {
        console.error('Delete event error:', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Failed to delete event'
        }, { status: 500 });
    }
}

