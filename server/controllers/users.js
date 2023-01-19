import User from "../models/User.js";
import House from "../models/House.js";
import { __dirname } from "../index.js";
import * as path from "path"

// Read
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch(err) {
    res.status(404).json({ message: err.message });
  }
}

export const getUserHouseInterests = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const houses = await Promise.all(
      user.houses.map((id) => House.findById(id))
    );
    const formattedData = houses.map(
      ({ id, ownerFirstName, ownerLastName, streetAddress, numBedrooms, numBathrooms, monthlyRent}) => {
        return { id, ownerFirstName, ownerLastName, streetAddress, numBedrooms, numBathrooms, monthlyRent};
      }
    );
    res.status(200).json(formattedData);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

// Update
export const addRemoveHouseInterest = async (req, res) => {
  try {
    const {userId, houseId } = req.params;
    const user = await User.findById(userId);     // Rename this to students
    const house = await House.findById(houseId);
    
    if(user.houses.includes(houseId)){
      user.houses = user.houses.filter((id) => id !== houseId);
      house.interestedTenants = house.interestedTenants.filter((id) => id !== userId);
    } else{
      user.houses.push(houseId);
      house.interestedTenants.push(userId);
    }
    
    await user.save();
    await house.save();

    const formattedData = House.map(
      ({ id, ownerFirstName, ownerLastName, streetAddress, numBedrooms, numBathrooms, monthlyRent}) => {
        return { id, ownerFirstName, ownerLastName, streetAddress, numBedrooms, numBathrooms, monthlyRent};
      }
    );
    res.status(200).json(formattedData);

  } catch (err) {
    res.status(404).json({ message: err.message});
  }
}

// Upload files works correctly
export const uploadFiles = async (req, res) => {
  try {
    const {resume, transcript} = req.files;
    const { id } = req.params;

    const updatedStudent = await User.findByIdAndUpdate(
      id,
      {
        resume: resume[0].path,
        transcript: transcript[0].path
      },
      { new: true }
    )

    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(404).json({ message: err.message});
  }
}

// Getters work correctly
export const getResume = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    let resumePath = path.join(__dirname, user.resume) ;
    console.log(user)
    console.log(resumePath)

    res.sendFile(resumePath)
    //res.download(resumePath)  // Download file literally downloads the file.

    
  } catch (err) {
    res.status(404).json({ message: err.message});
  }
}

export const getTranscript = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    let transcriptPath = path.join(__dirname, user.transcript) ;
    console.log(user)
    console.log(transcriptPath)

    res.sendFile(transcriptPath)
    //res.download(transcriptPath)  // Download file literally downloads the file.

  } catch (err) {
    res.status(404).json({ message: err.message});
  }
}