import { NextResponse } from "next/server";
import { connectDB } from "@/config/dbconnection";
import Event from "@/models/event";

// GET all events with optional filters
export async function GET(req: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');
        const eventType = searchParams.get('eventType');
        const limit = parseInt(searchParams.get('limit') || '50');
        const skip = parseInt(searchParams.get('skip') || '0');
        const sortBy = searchParams.get('sortBy') || 'date';
        const order = searchParams.get('order') === 'desc' ? -1 : 1;

        // Build filter object
        const filter: any = {};
        if (status) filter.status = status;
        if (eventType) filter.eventType = eventType;

        // Build sort object
        const sort: any = {};
        sort[sortBy] = order;

        // Get total count for pagination
        const total = await Event.countDocuments(filter);

        // Fetch events with filters, sorting, and pagination
        const events = await Event.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .populate('createdBy', 'name email')
            .select('-registrations.userId')
            .lean();

        return NextResponse.json(
            {
                success: true,
                data: events,
                pagination: {
                    total,
                    skip,
                    limit,
                    hasMore: skip + limit < total
                }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching events:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch events" },
            { status: 500 }
        );
    }
}
