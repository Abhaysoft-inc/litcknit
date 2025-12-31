import { NextResponse } from "next/server";
import { connectDB } from "@/config/dbconnection";
import Event from "@/models/event";
import { verifyToken } from "@/middleware/authMiddleware";

// GET a single event by ID
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;
        const event = await Event.findById(id)
            .populate('createdBy', 'name email')
            .populate('registrations.userId', 'name email phone')
            .lean();

        if (!event) {
            return NextResponse.json(
                { success: false, error: "Event not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: event
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching event:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch event" },
            { status: 500 }
        );
    }
}

// PUT/PATCH - Update an event by ID
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Verify authentication
        const tokenPayload = await verifyToken(req);
        if (!tokenPayload.decoded) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Check if user is admin
        if (tokenPayload.decoded.role !== 'admin') {
            return NextResponse.json(
                { success: false, error: "Forbidden - Admin access required" },
                { status: 403 }
            );
        }

        await connectDB();

        const { id } = await params;
        // Check if event exists
        const existingEvent = await Event.findById(id);
        if (!existingEvent) {
            return NextResponse.json(
                { success: false, error: "Event not found" },
                { status: 404 }
            );
        }

        const updateData = await req.json();

        // Validate event type and team size if being updated
        if (updateData.eventType === 'team' && updateData.teamSize && updateData.teamSize < 2) {
            return NextResponse.json(
                { success: false, error: "Team size must be at least 2 for team events" },
                { status: 400 }
            );
        }

        // Fields that should not be directly updated via this endpoint
        const protectedFields = ['_id', 'createdBy', 'createdAt', 'updatedAt', 'registrations'];
        protectedFields.forEach(field => delete updateData[field]);

        // Update the event
        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).populate('createdBy', 'name email');

        return NextResponse.json(
            {
                success: true,
                message: "Event updated successfully",
                data: updatedEvent
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error updating event:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update event" },
            { status: 500 }
        );
    }
}

// DELETE an event by ID
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Verify authentication
        const tokenPayload = await verifyToken(req);
        if (!tokenPayload.decoded) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Check if user is admin
        if (tokenPayload.decoded.role !== 'admin') {
            return NextResponse.json(
                { success: false, error: "Forbidden - Admin access required" },
                { status: 403 }
            );
        }

        await connectDB();

        const { id } = await params;
        // Check if event exists
        const event = await Event.findById(id);
        if (!event) {
            return NextResponse.json(
                { success: false, error: "Event not found" },
                { status: 404 }
            );
        }

        // Check if there are active registrations
        const activeRegistrations = event.registrations.filter(
            (reg: any) => reg.status === 'registered' || reg.status === 'attended'
        );

        if (activeRegistrations.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Cannot delete event with active registrations",
                    activeRegistrations: activeRegistrations.length
                },
                { status: 400 }
            );
        }

        // Delete the event
        await Event.findByIdAndDelete(id);

        return NextResponse.json(
            {
                success: true,
                message: "Event deleted successfully"
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error deleting event:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete event" },
            { status: 500 }
        );
    }
}
