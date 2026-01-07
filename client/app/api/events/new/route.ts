// Register for an event

import { NextRequest, NextResponse } from "next/server";
import eventModel from "@/models/event";
import dbconnection from "@/config/dbconnection";

// POST /api/events/new - Register for an event
export async function POST(req: NextRequest) {
    try {
        await dbconnection();

        const body = await req.json();
        const { eventId, name, email, phone, teamName, teamMembers } = body;

        // Validate required fields
        if (!eventId || !name || !email || !phone) {
            return NextResponse.json({
                success: false,
                message: 'Event ID, name, email, and phone are required'
            }, { status: 400 });
        }

        // Find the event
        const event = await eventModel.findById(eventId);

        if (!event) {
            return NextResponse.json({
                success: false,
                message: 'Event not found'
            }, { status: 404 });
        }

        // Check if registration deadline has passed
        if (new Date() > new Date(event.registrationDeadline)) {
            return NextResponse.json({
                success: false,
                message: 'Registration deadline has passed'
            }, { status: 400 });
        }

        // Check if event is not accepting registrations
        if (event.status === 'Completed' || event.status === 'Cancelled') {
            return NextResponse.json({
                success: false,
                message: `Cannot register for ${event.status.toLowerCase()} event`
            }, { status: 400 });
        }

        // Check if already registered
        const alreadyRegistered = event.registrations.some(
            (reg: any) => reg.email.toLowerCase() === email.toLowerCase()
        );

        if (alreadyRegistered) {
            return NextResponse.json({
                success: false,
                message: 'Already registered for this event'
            }, { status: 400 });
        }

        // Check if max participants reached
        if (event.registrations.length >= event.maxParticipants) {
            return NextResponse.json({
                success: false,
                message: 'Event is full'
            }, { status: 400 });
        }

        // Validate team registration if team event
        if (event.eventType === 'team') {
            if (!teamName) {
                return NextResponse.json({
                    success: false,
                    message: 'Team name is required for team events'
                }, { status: 400 });
            }

            if (!teamMembers || teamMembers.length < event.teamSize - 1) {
                return NextResponse.json({
                    success: false,
                    message: `Team must have ${event.teamSize} members`
                }, { status: 400 });
            }
        }

        // Add registration
        const registration = {
            name,
            email: email.toLowerCase(),
            phone,
            teamName: event.eventType === 'team' ? teamName : undefined,
            teamMembers: event.eventType === 'team' ? teamMembers : undefined,
            registeredAt: new Date(),
            status: 'registered'
        };

        event.registrations.push(registration);
        await event.save();

        return NextResponse.json({
            success: true,
            message: 'Registration successful',
            data: {
                eventName: event.name,
                registrationId: event.registrations[event.registrations.length - 1]._id
            }
        }, { status: 201 });

    } catch (error: any) {
        console.error('Event registration error:', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Failed to register for event'
        }, { status: 500 });
    }
}

