const router = require("express").Router();
const {
  fetchUsers,
  fetchSingleUser,
  generateUser,
  updateUser,
  removeUser,
  addNewFriend,
  removeFriend,
} = require("../../controllers/user-controller");

router.route("/").get(fetchUsers).post(generateUser);

router
  .route("/:userId")
  .get(fetchSingleUser)
  .put(updateUser)
  .delete(removeUser);

router
  .route("/:userId/friends/:friendId")
  .post(addNewFriend)
  .delete(removeFriend);

module.exports = router;
