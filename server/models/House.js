import mongoose from "mongoose";

const HouseSchema = new mongoose.Schema(
  {
    ownerFirstName: {
      type: String,
      required: true,
      min: 2,
      max: 50
    },
    ownerLastName: {
      type: String,
      required: true,
      min: 2,
      max: 50
    },
    streetAddress: {
      type: String,
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
    interestedTenantas: {
      type: Array,
      default: []
    }
  }
)

const House = mongoose.model("House", HouseSchema);

export default House