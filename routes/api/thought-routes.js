const router = require("express").Router();
const {
   getAllThoughts,
   addThought,
   removeThought,
   addReaction,
   removeReaction,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts).post(addThought);

router.route("/:userId/:thoughtId").delete(removeThought);

router.route("/:userId/:thoughtId/reactions").post(addReaction);
router
   .route("/:userId/:thoughtId/reactions/:reactionId")
   .delete(removeReaction);

module.exports = router;
