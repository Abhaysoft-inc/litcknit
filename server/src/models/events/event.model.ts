// models/Event.model.js
import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    title: String,
    slug: { type: String, unique: true },
    description: String,

    registrationType: {
        type: String,
        enum: ["individual", "team"]
    },

    teamMinSize: Number,
    teamMaxSize: Number,

    participantFields: Array,
    registrationFields: Array,

    winners: Object,
    completed: Boolean
}, { timestamps: true });

export default mongoose.model("Event", EventSchema);
