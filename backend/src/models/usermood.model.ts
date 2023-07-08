import mongoose,{Types} from 'mongoose'

export interface Mood {
  // date is in format YYYY-MM-DD
    date: string;
    entry: string;
    mood: string;
}
  
export interface Usermoods {
    patientId: string;
    moods: Mood[];
    streak: number;
}

export interface MoodDocument extends Mood, mongoose.Document {

}

export interface UsermoodsDocument extends Usermoods, mongoose.Document {

}

const Schema = mongoose.Schema

const moodSchema = new Schema<MoodDocument>({
    date: {
      type: String,
      required: true
    },
    entry: {
      type: String,
      required: true
    },
    mood: {
      type: String,
      required: true
    }
  });

const usermoodSchema = new Schema<UsermoodsDocument>({
    patientId: {
        type: String,
        required: true
    },
    moods: {
        type: [moodSchema],
        required: true,
        default: []
    },
    streak: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model("Usermood", usermoodSchema)