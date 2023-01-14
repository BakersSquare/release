import mongoose, { Schema } from "mongoose";

const homeowner = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      default:"",
      min: 2,
      max: 50
    },
    lastName: {
      type: String,
      required: true,
      default:"",
      min: 2,
      max: 50
    },
    email: {
      type: String,
      required: true,
      min: 2,
      max: 50,
      unique: true
    },
    password: {                   // Find how to add more configurations to this one, it should be more secure
      type: String,
      required: true,
      default:"",
      min: 8
    },
    phoneNum: {
      type: String,
      required: false,
      default: ""
    },
    houses: [{
      type: Schema.Types.ObjectId,
      ref: 'House'
    }]
  },
  {timestamps: true}
);

const Homeowner = mongoose.model("Homeowner", homeowner);

export default Homeowner;