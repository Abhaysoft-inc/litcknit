// Event Registration API Routes

import { NextRequest, NextResponse } from "next/server";
import eventModel from "@/models/event";
import dbconnection from "@/config/dbconnection";

// POST /api/events/[id]/register - Register for an event
export async function POST(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await dbconnection();

        const { id } = await context.params;
        const body = await req.json();

        // Validate required fields
        const { name, email, phone, teamName, teamMembers } = body;

        if (!name || !email || !phone) {
            return NextResponse.json({
                success: false,
                message: 'Name, email, and phone are required'
            }, { status: 400 });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({
                success: false,
                message: 'Invalid email format'
            }, { status: 400 });
        }

        // Phone validation (Indian format)
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
            return NextResponse.json({
                success: false,
                message: 'Invalid phone number format'
            }, { status: 400 });
        }

        // Find the event
        const event = await eventModel.findById(id);

        if (!event) {
            return NextResponse.json({
                success: false,
                message: 'Event not found'
            }, { status: 404 });
        }

        // Check if event is cancelled
        if (event.status === 'Cancelled') {
            return NextResponse.json({
                success: false,
                message: 'Cannot register for a cancelled event'
            }, { status: 400 });
        }

        // Check if event is completed
        if (event.status === 'Completed') {
            return NextResponse.json({
                success: false,
                message: 'Cannot register for a completed event'
            }, { status: 400 });
        }

        // Check if registration deadline has passed
        if (new Date() > new Date(event.registrationDeadline)) {
            return NextResponse.json({
                success: false,
                message: 'Registration deadline has passed'
            }, { status: 400 });
        }

        // Check if event is full
        if (event.registrations.length >= event.maxParticipants) {
            return NextResponse.json({
                success: false,
                message: 'Event is full. Maximum participants reached.'
            }, { status: 400 });
        }

        // Check if user is already registered
        const alreadyRegistered = event.registrations.some(
            (reg: any) => reg.email.toLowerCase() === email.toLowerCase()
        );

        if (alreadyRegistered) {
            return NextResponse.json({
                success: false,
                message: 'You are already registered for this event'
            }, { status: 400 });
        }

        // For team events, validate team data
        if (event.eventType === 'team') {
            if (!teamName) {
                return NextResponse.json({
                    success: false,
                    message: 'Team name is required for team events'
                }, { status: 400 });
            }

            if (!teamMembers || teamMembers.length === 0) {
                return NextResponse.json({
                    success: false,
                    message: 'At least one team member is required'
                }, { status: 400 });
            }

            // Validate team size
            const totalMembers = teamMembers.length + 1; // +1 for team leader
            if (totalMembers !== event.teamSize) {
                return NextResponse.json({
                    success: false,
                    message: `Team size must be exactly ${event.teamSize} members`
                }, { status: 400 });
            }

            // Validate each team member
            for (const member of teamMembers) {
                if (!member.name || !member.email || !member.phone) {
                    return NextResponse.json({
                        success: false,
                        message: 'All team members must have name, email, and phone'
                    }, { status: 400 });
                }

                if (!emailRegex.test(member.email)) {
                    return NextResponse.json({
                        success: false,
                        message: `Invalid email format for team member: ${member.name}`
                    }, { status: 400 });
                }
            }

            // Check for duplicate team member emails
            const teamEmails = [email, ...teamMembers.map((m: any) => m.email.toLowerCase())];
            const uniqueEmails = new Set(teamEmails);
            if (uniqueEmails.size !== teamEmails.length) {
                return NextResponse.json({
                    success: false,
                    message: 'Duplicate emails found in team members'
                }, { status: 400 });
            }

            // Check if any team member is already registered
            const teamMemberRegistered = event.registrations.some(
                (reg: any) => teamEmails.includes(reg.email.toLowerCase())
            );

            if (teamMemberRegistered) {
                return NextResponse.json({
                    success: false,
                    message: 'One or more team members are already registered for this event'
                }, { status: 400 });
            }
        }

        // Create registration object
        const registration: any = {
            name,
            email,
            phone,
            registeredAt: new Date(),
            status: 'registered'
        };

        // Add team data if it's a team event
        if (event.eventType === 'team') {
            registration.teamName = teamName;
            registration.teamMembers = teamMembers;
        }

        // Add registration to event
        event.registrations.push(registration);
        await event.save();

        return NextResponse.json({
            success: true,
            message: 'Successfully registered for the event',
            data: {
                eventName: event.name,
                registrationId: event.registrations[event.registrations.length - 1]._id,
                registeredAt: registration.registeredAt
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

// GET /api/events/[id]/register - Get all registrations for an event (admin only)
export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await dbconnection();

        const { id } = await context.params;
        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');

        // Find the event
        const event = await eventModel.findById(id);

        if (!event) {
            return NextResponse.json({
                success: false,
                message: 'Event not found'
            }, { status: 404 });
        }

        let registrations = event.registrations;

        // Filter by status if provided
        if (status) {
            registrations = registrations.filter((reg: any) => reg.status === status);
        }

        return NextResponse.json({
            success: true,
            count: registrations.length,
            maxParticipants: event.maxParticipants,
            spotsRemaining: event.maxParticipants - event.registrations.length,
            data: registrations
        });

    } catch (error: any) {
        console.error('Get registrations error:', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Failed to fetch registrations'
        }, { status: 500 });
    }
}

// DELETE /api/events/[id]/register - Cancel registration
export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await dbconnection();

        const { id } = await context.params;
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({
                success: false,
                message: 'Email is required to cancel registration'
            }, { status: 400 });
        }

        // Find the event
        const event = await eventModel.findById(id);

        if (!event) {
            return NextResponse.json({
                success: false,
                message: 'Event not found'
            }, { status: 404 });
        }

        // Find the registration
        const registrationIndex = event.registrations.findIndex(
            (reg: any) => reg.email.toLowerCase() === email.toLowerCase()
        );

        if (registrationIndex === -1) {
            return NextResponse.json({
                success: false,
                message: 'Registration not found'
            }, { status: 404 });
        }

        // Update registration status to cancelled instead of removing
        event.registrations[registrationIndex].status = 'cancelled';
        await event.save();

        return NextResponse.json({
            success: true,
            message: 'Registration cancelled successfully'
        });

    } catch (error: any) {
        console.error('Cancel registration error:', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Failed to cancel registration'
        }, { status: 500 });
    }
}
