import House from "../models/House.js";
import Homeowner from "../models/Homeowner.js";
import User from "../models/User.js";


// CREATE
export const addHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const { streetAddress, numBathrooms, numBedrooms, monthlyRent } = req.body;
    const newHouse = new House({
      owner: id,
      streetAddress: streetAddress,
      numBedrooms: numBedrooms,
      numBathrooms: numBathrooms,
      monthlyRent: monthlyRent
    })
    const savedHouse = await newHouse.save();

    const owner = await Homeowner.findById(id);
    owner.houses.push(savedHouse._id);
    await owner.save();

    res.status(201).json(savedHouse);
  } catch (err) {
    res.status(404).json({error: err.message})
  }
}

// READ
export const getFeedHouses = async (req, res) => {
  try{
    const Houses = await House.find();
    res.status(200).json(Houses)
  } catch (e){
    res.status(404).json({message: e.message})
  }
}
// Work out the logic of this to return the saved houses of a user, or the owned houses of an owner. We'll likely need to split the logic
export const getHomeownerHouses = async (req, res) => {
  try{
    const { userId } = req.params;
    const Houses = await House.find({userId});
    res.status(200).json(Houses)
  } catch (e){
    res.status(404).json({message: e.message})
  }
}

export const favoriteHouse = async (req, res) => {
  try {
    const {id} = req.params;
    const {userId} = req.body;

    const house = await House.findById(id);
    const isFavorited = House.interestedTenants.get(userId)

    if(isFavorited){
      house.interestedTenants.delete(userId);
    } else {
      house.interestedTenants.save(userId);
    }

    const updatedHouse = await House.findByIdAndUpdate(
      id,
      {
        numBathrooms: house.numBathrooms,
        numBedrooms: house.numBedrooms,
        monthlyRent: house.monthlyRent,
        ownerFirstName: house.ownerFirstName,
        ownerLastName: house.ownerLastName,
        streetAddress: house.streetAddress,
        interestedTenants: house.interestedTenants
      }
    )
    res.statuss(200).json(updatedHouse);

  } catch(e) {
    res.status(404).json({message: e.message})
  }
}