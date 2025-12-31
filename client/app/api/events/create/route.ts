import { NextResponse } from "next/server";
import { connectDB } from "@/config/dbconnection";
import Event from "@/models/event";
import { verifyToken } from "@/middleware/authMiddleware";

export async function POST(req: Request) {
    try {
        // Verify authentication
        const tokenPayload = await verifyToken(req);
        if (!tokenPayload) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Check if user is admin
        if (tokenPayload.decoded?.role !== 'admin') {
            return NextResponse.json(
                { error: "Forbidden - Admin access required", err: tokenPayload.decoded?.role },

                { status: 403 }
            );
        }

        await connectDB();

        const eventData = await req.json();

        // Validate required fields
        if (!eventData.name || !eventData.date || !eventData.time || !eventData.venue) {
            return NextResponse.json(
                { error: "Missing required fields: name, date, time, and venue are required" },
                { status: 400 }
            );
        }

        if (!eventData.description || !eventData.maxParticipants || !eventData.registrationDeadline) {
            return NextResponse.json(
                { error: "Missing required fields: description, maxParticipants, and registrationDeadline are required" },
                { status: 400 }
            );
        }

        if (!eventData.poster || !eventData.rulebook) {
            return NextResponse.json(
                { error: "Missing required files: poster and rulebook are required" },
                { status: 400 }
            );
        }

        // Validate event type and team size
        if (eventData.eventType === 'team' && (!eventData.teamSize || eventData.teamSize < 2)) {
            return NextResponse.json(
                { error: "Team size must be at least 2 for team events" },
                { status: 400 }
            );
        }

        // Create event
        const newEvent = new Event({
            name: eventData.name,
            description: eventData.description,
            date: new Date(eventData.date),
            time: eventData.time,
            venue: eventData.venue,
            maxParticipants: parseInt(eventData.maxParticipants),
            registrationDeadline: new Date(eventData.registrationDeadline),
            status: eventData.status || 'Upcoming',
            eventType: eventData.eventType || 'individual',
            teamSize: eventData.eventType === 'team' ? parseInt(eventData.teamSize) : 1,
            prizes: eventData.prizes || '',
            poster: eventData.poster,
            rulebook: eventData.rulebook,
            createdBy: tokenPayload.decoded?.userId,
            registrations: []
        });

        await newEvent.save();

        return NextResponse.json(
            {
                message: "Event created successfully",
                event: {
                    id: newEvent._id,
                    name: newEvent.name,
                    date: newEvent.date,
                    status: newEvent.status
                }
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json(
            { error: "Failed to create event" },
            { status: 500 }
        );
    }
}
