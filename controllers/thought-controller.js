const { Thought, User } = require("../models");

const thoughtController = {
   // get all thoughts
   getAllThoughts(req, res) {
      Thought.find({})
         .select("-__v")
         .sort({ _id: -1 })
         .then((dbThoughtData) => res.json(dbThoughtData))
         .catch((err) => {
            console.log(err);
            res.status(400).json(err);
         });
   },

   // get one thought by id
   getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
         .populate({
            path: "reactions",
            select: "-__v",
         })
         .select("-__v")
         .then((dbThoughtData) => {
            // If no user is found, send 404
            if (!dbThoughtData) {
               res.status(404).json({
                  message: "No thought found with this id!",
               });
               return;
            }
            res.json(dbThoughtData);
         })
         .catch((err) => {
            console.log(err);
            res.status(400).json(err);
         });
   },

   // add thought
   addThought({ params, body }, res) {
      console.log(body);
      // create new thought
      Thought.create(body)
         // then update user thoughts field
         .then(({ _id }) => {
            return User.findOneAndUpdate(
               { username: body.username },
               { $push: { thoughts: _id } },
               { new: true }
            );
         })
         .then((dbUserData) => res.json(dbUserData))
         .catch((err) => res.status(400).json(err));
   },

   // remove thought
   removeThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.id })
         .then((deletedThought) => {
            if (!deletedThought) {
               return res
                  .status(404)
                  .json({ message: "No thought with this id!" });
            }

            res.json(deletedThought);
         })
         .catch((err) => res.json(err));
   },

   // add reaction
   addReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
         { _id: params.id },
         { $push: { reactions: body } },
         { new: true, runValidators: true }
      )
         .then((dbThoughtData) => {
            if (!dbThoughtData) {
               res.status(404).json({
                  message: "No thought found with this id!",
               });
               return;
            }
            res.json(dbThoughtData);
         })
         .catch((err) => res.json(err));
   },

   // remove reaction
   removeReaction({ params }, res) {},
};

module.exports = thoughtController;
