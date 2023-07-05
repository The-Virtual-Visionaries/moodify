import mongoose, {Types} from "mongoose";

export interface Meeting {
    patientId: Types.ObjectId;
    therapistId: Types.ObjectId;
    startDate: Date;
    endDate: Date;
    topic: string;
}

export interface MeetingDocument extends Meeting, mongoose.Document {
}

const Schema = mongoose.Schema

const meetingSchema = new Schema<MeetingDocument>({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    therapistId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    topic: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Meeting", meetingSchema)