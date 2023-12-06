import mongoose, { Schema } from "mongoose";

const professionalSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  profilePic: {
    type: String,
    required: true
  },
  expertise: {
    type: [{
      type: String,
      enum: ['Depression', 'Anxiety', 'PTSD', 'OCD', 'Stress'],
    }],
    required: true
  },
  licenseNo: {
    type: String,
    trim: true,
    required: true
  },
  timings: {
    type: Object,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  cv: {
    type: [String], // Assuming you store file paths or URLs
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  feePerSession: {
    type: Number,
    required: [true, "This is necessary"]
  }
},
  { timestamps: true }
);

export const Professional = mongoose.model("Professional", professionalSchema)