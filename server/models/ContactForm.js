import mongoose from "mongoose";

const ContactFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      min: 2,
      max: 50
    },
    phoneNum: {
      type: String,
      required: false,
      default:"",
      min: 8
    },
    subject: {
      type: String,
      required: true,
      maxlength: 40,
      default: ""
    },
    message: {
      type: String,
      required: true,
      maxlength: 280,
      default: ""
    }
  }
);

const ContactForm = mongoose.model("ContactForm", ContactFormSchema);

export default ContactForm;