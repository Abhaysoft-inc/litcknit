// GET, UPDATE, DELETE specific event

import { NextRequest, NextResponse } from "next/server";
import eventModel from "@/models/event";
import dbconnection from "@/config/dbconnection";

// GET /api/events/[id] - Get single event
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbconnection();

        const event = await eventModel
            .findById(params.id)
            .populate('createdBy', 'name email')
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
    { params }: { params: { id: string } }
) {
    try {
        await dbconnection();

        const body = await req.json();

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
                params.id,
                { $set: body },
                { new: true, runValidators: true }
            )
            .populate('createdBy', 'name email');

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
    { params }: { params: { id: string } }
) {
    try {
        await dbconnection();

        const event = await eventModel.findByIdAndDelete(params.id);

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

