import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
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
    password: {
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
    resume: {
      type: String,
      default: ""
    },
    transcript: {
      type: String,
      default: ""
    },
    houses: [{
      type: Schema.Types.ObjectId,
      ref: 'House'
    }]
  },
  {timestamps: true}
);

const User = mongoose.model("User", UserSchema);

export default User;