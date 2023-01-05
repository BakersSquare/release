import mongoose from "mongoose";

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
    password: {                   // Find how to add more configurations to this one, it should be more secure
      type: String,
      required: true,
      default:"",
      min: 8
    },
    phoneNum: {
      type: String,
      required: false,
      maxlength: 10,
      default: ""
    },
    houses: {
      type: Array,
      default: []
    }
  }
);

const User = mongoose.model("User", UserSchema);

export default User;