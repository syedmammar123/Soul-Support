import mongoose, { Schema } from "mongoose";

const professionalSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  profilePic: {
    type: String, // Cloudinary url
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
  // timings: {
  //   type: Object,
  //   required: true
  // },
  timings: {
    type: String,
    required: true,
    validate:{
      validator: function(time){
        const validTimings = [
          'Mon-Wed-Fri: 11am-4pm',
          'Tue-Thu-Sat: 4pm-9pm',
          'Sunday: 10am-8pm',
        ];
        return validTimings.includes(time);
      },
      message: props => `${props.value} is not a valid timing. Please use one of the specified timings.`,
    }
  },
  specialization: {
    type: String,
    required: true
  },
  cv: {
    type: String, // Cloudinary url
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
    required: [true, "feePerSession is necessary"]
  },
  
},
  { timestamps: true }
);

export const Professional = mongoose.model("Professional", professionalSchema)