import bcrypt from 'bcrypt'; // crypt password
import jwt from 'jsonwebtoken'; // web token for authorization
import User from '../models/User.js';


// Sign up
export const register = async (req, res) => {
    try {
        const { 
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
          } = req.body; //deconstructing received object

          // crypting password
          const salt = await bcrypt.genSalt();
          const passwordHash = await bcrypt.hash(password, salt);
          //console.log("Password Hash: ", passwordHash);

          const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile : Math.floor(Math.random()*10000),
            impressions : Math.floor(Math.random()*10000)
          });

          const savedUser = await newUser.save(); // Save user in the database MongoDB
          res.status(201).json(savedUser); //check
        
    } catch (error) {
        res.status(500).json({ error : error.message});
    }
};

// Sign in

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ msg: 'User does not exist.' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.ACCESS_TOKEN_SECRET);
    delete existingUser.password;
    
    console.log('token', token,'user ', JSON.stringify(existingUser));

    res.status(200).json({
      token,
      user: {
        id: existingUser._id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        picturePath: existingUser.picturePath,
        friends: existingUser.friends,
        location: existingUser.location,
        occupation: existingUser.occupation,
        viewedProfile: existingUser.viewedProfile,
        impressions: existingUser.impressions,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
