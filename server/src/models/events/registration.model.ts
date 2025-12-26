import mongoose from "mongoose";

const ParticipantSchema = new mongoose.Schema({
    name: String,
    email: String,
    fields: Map
}, { _id: false });

const RegistrationSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },

    type: {
        type: String,
        enum: ["individual", "team"]
    },

    teamName: String,

    participants: [ParticipantSchema],

    registrationFieldsData: Map,

    status: {
        type: String,
        default: "registered"
    }
}, { timestamps: true });

export default mongoose.model("Registration", RegistrationSchema);
