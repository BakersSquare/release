import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ContactForm from "../models/ContactForm.js";
import Email from "../models/Email.js";
import Homeowner from "../models/Homeowner.js";
import User from "../models/User.js"

// Register the user

export const emailInterest = async (req, res) => {
  try {
    console.log(req.body);
    const {
      email
    } = req.body;

    const newUser = new Email({
      email
    });


    const savedUserEmail = await newUser.save();
    res.status(201).json(savedUserEmail);      // 201 status code means something was created


  } catch (error) {
    res.status(500).json({
      error: error.message,
      reqPayload: req.body 
  });
    
  }
}

export const contactForm = async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      email,
      phoneNum,
      subject,
      message
    } = req.body;

    const newContactForm = new ContactForm({
      name,
      email,
      phoneNum,
      subject,
      message
    });


    const savedForm = await newContactForm.save();
    res.status(201).json(savedForm);      // 201 status code means something was created


  } catch (error) {
    res.status(500).json({
      error: error.message,
      reqPayload: req.body 
  });
    
  }
}

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNum,
      isHomeowner
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);   // Encrypts the password
    if(isHomeowner === 'true'){
      const newHomeowner = new Homeowner({
        firstName,
        lastName,
        email,
        password: passwordHash,
        phoneNum
      });
      const savedUser = await newHomeowner.save();
      res.status(201).json(savedUser);      // 201 status code means something was created
    } else{
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        phoneNum
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);      // 201 status code means something was created
    }

  } catch (e) {
    console.log(e)
    res.status(500).json({error: e.message });
  }
}

// Login function - Consider replacing this with a different authentication to improve security
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginUser = await User.findOne({email: email});
    const loginHomeOwner = await Homeowner.findOne({email: email})

    var user = (loginUser ? loginUser : loginHomeOwner)

    if (!user) {
      return res.status(400).json({msg: "User does not exist"});
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({msg: "Invalid credentials"});
    }

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({token, user});

  } catch (e) {
    res.status(500).json({error: err.message });
  }
}