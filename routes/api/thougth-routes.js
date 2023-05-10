const router = require("express").Router();
const {
  fetchThoughts,
  fetchSingleThought,
  makeThought,
  updateUserThought,
  deleteUserThought,
  addUserReaction,
  deleteUserReaction,
} = require("../../controllers/thougth-controller");

// /api/thoughts
router.route("/").get(fetchThoughts).post(makeThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(fetchSingleThought)
  .put(updateUserThought)
  .delete(deleteUserThought);

// /api/thoughts/:thoughtId/reactions
router
  .route("/:thoughtId/reactions")
  .post(addUserReaction)
  .delete(deleteUserReaction);

module.exports = router;
