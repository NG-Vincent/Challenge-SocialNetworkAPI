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

router.route("/:id").get(getThoughtById).delete(removeThought);

router.route("/:id/reactions").post(addReaction);

module.exports = router;
