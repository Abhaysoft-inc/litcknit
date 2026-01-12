import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    maxParticipants: {
        type: Number,
        required: true
    },
    registrationDeadline: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
        default: 'Upcoming'
    },
    eventType: {
        type: String,
        enum: ['individual', 'team'],
        default: 'individual'
    },
    teamSize: {
        type: Number,
        default: 1,
        min: 1
    },
    prizes: {
        type: String,
        required: false
    },
    poster: {
        type: String,
        required: true
    },
    rulebook: {
        type: String,
        required: true
    },
    registrations: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        teamName: {
            type: String,
            trim: true
        },
        teamMembers: [{
            name: { type: String, trim: true },
            email: { type: String, lowercase: true, trim: true },
            phone: { type: String, trim: true }
        }],
        registeredAt: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['registered', 'attended', 'cancelled', 'banned', 'disqualified'],
            default: 'registered'
        },
        result: {
            position: {
                type: String,
                enum: ['1st', '2nd', '3rd', 'participated', 'custom']
            },
            customPosition: {
                type: String
            },
            remarks: {
                type: String
            }
        }
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
}, {
    timestamps: true
});

// Create indexes for better query performance
eventSchema.index({ date: 1, status: 1 });
eventSchema.index({ eventType: 1 });
eventSchema.index({ createdBy: 1 });

const eventModel = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default eventModel;
