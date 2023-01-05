import User from "../models/User.js";
import House from "../models/House.js";

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
    const user = await User.findById(userId);
    const house = await House.findById(houseId);
    
    if(user.houses.includes(houseID)){
      user.houses = user.houses.filter((id) => id !== houseId);
      house.interestedTenantas = house.interestedTenantas.filter((id) => id !== userId);
    } else{
      user.houses.push(houseId);
      house.interestedTenantas.push(userId);
    }
    
    await user.save();
    await house.save();

    const formattedData = houses.map(
      ({ id, ownerFirstName, ownerLastName, streetAddress, numBedrooms, numBathrooms, monthlyRent}) => {
        return { id, ownerFirstName, ownerLastName, streetAddress, numBedrooms, numBathrooms, monthlyRent};
      }
    );
    res.status(200).json(formattedData);

  } catch (err) {
    res.status(404).json({ message: err.message});
  }
}