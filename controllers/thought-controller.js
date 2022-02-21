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
                  message: "No user found with this id!",
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
   addThought({ body }, res) {
      console.log(body);
      Thought.create(body)
         .then((dbThoughtData) => res.json(dbThoughtData))
         .catch((err) => res.status(400).json(err));
   },

   // remove thought
   removeThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.thoughtId })
         .then((deletedThought) => {
            if (!deletedThought) {
               return res
                  .status(404)
                  .json({ message: "No thought with this id!" });
            }
            return User.findOneAndUpdate(
               { _id: params.userId },
               { $pull: { thoughts: params.thoughtId } },
               { new: true }
            );
         })
         .then((dbUserData) => {
            if (!dbUserData) {
               res.status(404).json({
                  message: "No user found with this id!",
               });
               return;
            }
            res.json(dbUserData);
         })
         .catch((err) => res.json(err));
   },

   // add reaction
   addReaction({ params }, res) {},

   // remove reaction
   removeReaction({ params }, res) {},
};

module.exports = thoughtController;
