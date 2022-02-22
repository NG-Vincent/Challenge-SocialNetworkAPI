const router = require("express").Router();
const {
   getAllUsers,
   getUserById,
   createUser,
   addFriend,
   deleteFriend,
   updateUser,
   deleteUser,
} = require("../../controllers/user-controller");

router.route("/").get(getAllUsers).post(createUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
