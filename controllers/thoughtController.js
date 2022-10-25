const { User, Thought } = require('../models');


module.exports = {

//api/thoughts

//get all thoughts
getThoughts(req, res) {
    Thought.find()
      .sort({createdAt: -1})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
// get single thought by id
getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => {
        if(!thought) {
          return res.status(404).json({ message: 'No thought with this id'})
        }
        res.json(thought)
      })      
      .catch((err) => res.status(500).json(err));
  },
// create a new route
createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          {_id: req.body.userId},
          { $push: {
              thoughts: thought._id
          }},
          {new: true}
        )
      })
      .then((user) => {
        if(!user) {
          return res.status(404).json({ message: 'No user with this id'})
        }
        res.json({ message: 'Thought successfully created!'})
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
//update route by id
updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
//remove thought by id
deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!'})
        }
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: {thoughts: req.params.thoughtId}},
          { new: true },
        )
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user with this id!'})
        }
        res.json({ message: 'Thought successfully deleted!'})
      })
      .catch((err) => res.status(500).json(err));
  },



//api/thoughts/:thoughtsId/reactions
//POST-ROUTE TO CREATE A REACTION STORED IN A SIGNLE THOUGHT'S REACTIONS ARRAY
addReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId},
    { $addToSet: { reactions: req.body}},
    { runValidators: true, new: true }, 
  )
  .then((thought) => {
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!'})
    }
    res.json(thought)
  })
  .catch((err) => res.status(500).json(err));
},

//DELETE TO PULL AND REMOVE A REACTION BY THE REACTION ID VALUE
removeReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId},
    { $pull: { reactions: {reactionId: req.params.reactionId}}},
    { runValidators: true, new: true }, 
  )
  .then((thought) => {
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!'})
    }
    res.json(thought)
  })
  .catch((err) => res.status(500).json(err));
},
};