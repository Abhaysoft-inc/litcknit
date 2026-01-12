import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/config/dbconnection';
import eventModel from '@/models/event';
import mongoose from 'mongoose';

// Update registration status or result
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; registrationId: string }> }
) {
    try {
        await connectDB();

        const { id: eventId, registrationId } = await params;
        const body = await request.json();
        const { status, result } = body;

        // Validate ObjectIds
        if (!mongoose.Types.ObjectId.isValid(eventId) || !mongoose.Types.ObjectId.isValid(registrationId)) {
            return NextResponse.json({
                success: false,
                message: 'Invalid event or registration ID'
            }, { status: 400 });
        }

        const event = await eventModel.findById(eventId);

        if (!event) {
            return NextResponse.json({
                success: false,
                message: 'Event not found'
            }, { status: 404 });
        }

        // Find the registration
        const registration = event.registrations.id(registrationId);

        if (!registration) {
            return NextResponse.json({
                success: false,
                message: 'Registration not found'
            }, { status: 404 });
        }

        // Update status if provided
        if (status) {
            const validStatuses = ['registered', 'attended', 'cancelled', 'banned', 'disqualified'];
            if (!validStatuses.includes(status)) {
                return NextResponse.json({
                    success: false,
                    message: 'Invalid status'
                }, { status: 400 });
            }
            registration.status = status;
        }

        // Update result if provided
        if (result) {
            console.log('Updating result:', result);
            console.log('Current registration result:', registration.result);

            // Initialize result object if it doesn't exist
            if (!registration.result) {
                registration.result = {
                    position: undefined,
                    customPosition: undefined,
                    remarks: undefined
                };
            }

            if (result.position) {
                const validPositions = ['1st', '2nd', '3rd', 'participated', 'custom'];
                if (!validPositions.includes(result.position)) {
                    return NextResponse.json({
                        success: false,
                        message: 'Invalid position'
                    }, { status: 400 });
                }
                registration.result.position = result.position;
            }

            if (result.customPosition !== undefined) {
                registration.result.customPosition = result.customPosition;
            }

            if (result.remarks !== undefined) {
                registration.result.remarks = result.remarks;
            }

            console.log('Updated registration result:', registration.result);

            // Mark the subdocument as modified
            registration.markModified('result');
        }

        await event.save();

        console.log('Event saved successfully');

        return NextResponse.json({
            success: true,
            message: 'Registration updated successfully',
            data: registration
        }, { status: 200 });

    } catch (error: any) {
        console.error('Error updating registration:', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Failed to update registration'
        }, { status: 500 });
    }
}

// Delete registration
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; registrationId: string }> }
) {
    try {
        await connectDB();

        const { id: eventId, registrationId } = await params;

        // Validate ObjectIds
        if (!mongoose.Types.ObjectId.isValid(eventId) || !mongoose.Types.ObjectId.isValid(registrationId)) {
            return NextResponse.json({
                success: false,
                message: 'Invalid event or registration ID'
            }, { status: 400 });
        }

        const event = await eventModel.findById(eventId);

        if (!event) {
            return NextResponse.json({
                success: false,
                message: 'Event not found'
            }, { status: 404 });
        }

        // Remove the registration
        const registration = event.registrations.id(registrationId);

        if (!registration) {
            return NextResponse.json({
                success: false,
                message: 'Registration not found'
            }, { status: 404 });
        }

        registration.deleteOne();
        await event.save();

        return NextResponse.json({
            success: true,
            message: 'Registration deleted successfully'
        }, { status: 200 });

    } catch (error: any) {
        console.error('Error deleting registration:', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Failed to delete registration'
        }, { status: 500 });
    }
}
