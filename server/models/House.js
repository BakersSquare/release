import mongoose, { Schema } from "mongoose";

const HouseSchema = new mongoose.Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Homeowner'
    },
    streetAddress: {
      type: String,
      unique: true,
      required: true
    },
    numBedrooms: {
      type: Number,
      required: true
    },
    numBathrooms: {
      type: Number,
      required: true
    },
    monthlyRent: {
      type: Number,
      required: true
    },
    interestedTenants: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {timestamps: true}
)

const House = mongoose.model("House", HouseSchema);

export default House