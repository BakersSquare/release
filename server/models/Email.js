import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 50
    }
  },
    {timestamps: true}
)

const Email = mongoose.model("Email", EmailSchema);

export default Email;