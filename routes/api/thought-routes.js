const router = require("express").Router();
const {
   getAllThoughts,
   getThoughtById,
   addThought,
   removeThought,
   addReaction,
   removeReaction,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts).post(addThought);

router.route("/:thoughtId").get(getThoughtById).delete(removeThought);

router.route("/:thoughtId/reactions").post(addReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
