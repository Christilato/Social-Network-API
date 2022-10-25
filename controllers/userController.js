const { User } = require('../models');

module.exports = {
  
// api/users

//get all users
getUsers(req, res) {
    User.find()
      .select('-__v')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
//get single user by id
getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
// post a new user
createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
//update user by id
updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user with this id!' })
        }
        res.json(user)
      }
      
        // !user
        //   ? res.status(404).json({ message: 'No user with this id!' })
        //   : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
// delete user by id
deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Student.deleteMany({ _id: { $in: course.students } }) //fix this
      )
      .then(() => res.json({ message: 'Course and students deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

///api/users/:userId/friends/:friendId
//PUT-ROUTE update by its id
addFriend (req,res) {
  User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: {friends: req.params.friendId}}, {new: true})
  .then((user) => {
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' })
    }
    res.json(user)
  }) 
  .catch((err) => res.status(500).json(err));
},

//DELETE remove user by id
removeFriend (req,res) {
  User.findOneAndUpdate({ _id: req.params.userId }, { $pull: {friends: req.params.friendId}}, {new: true})
  .then((user) => {
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' })
    }
    res.json(user)
  }) 
  .catch((err) => res.status(500).json(err));
}
};