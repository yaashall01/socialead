import User from '../models/User.js';

// Function getUser


export const getUser = async (req, res) => {
  
  try {
    const { id } = req.params; // Use "req.params" instead of "req.param" to get the parameter value

    const user = await User.findOne({ _id: id });

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User:', user);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function getUserFriend


// Function addRemoveFriend