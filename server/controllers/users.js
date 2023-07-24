import User from '../models/User.js';

// Function getUser

export const getUser = (req, res) => {
    const {id} = req.param;
    User.findOne({ _id: id }, (err, user) => {
        if (err) {
          console.error(err);
          return;
        }
        if (!user) {
          console.log('User not found');
          return;
        }
        console.log('User:', user);
        res.send(user);
      });
    
}

// Function getUserFriend


// Function addRemoveFriend