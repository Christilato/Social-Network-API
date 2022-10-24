const { User, Thought } = require('../models');


module.exports = {

//api/thoughts
//GET ALL THOUGHTS
getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
// GET SINGLE THOUGHT BY ID
getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
// POST TO CREATE A NEW THOUGHT
createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(though))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
//PUT-ROUTE TO UPDATE BY ITS ID
updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
//DELETE TO REMOVE BY ITS ID
deleteThought(req, res) {
    User.findOneAndDelete({ _id: req.params.thoughtId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No thought with that ID' })
          : Student.deleteMany({ _id: { $in: course.students } }) //fix this
      )
      .then(() => res.json({ message: 'Thought adeleted!' }))
      .catch((err) => res.status(500).json(err));
  },

};

//api/thoughts/:thoughtsId/reactions
//POST-ROUTE TO CREATE A REACTION STORED IN A SIGNLE THOUGHT'S REACTIONS ARRAY

//DELETE TO PULL AND REMOVE A REACTION BY THE REACTION ID VALUE
