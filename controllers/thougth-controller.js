const { User, Thought } = require("../models");

// fetch all thoughts
const fetchThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({});

    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// fetch single thought
const fetchSingleThought = async (req, res) => {
  try {
    const findThought = await Thought.findOne({ _id: req.params.thoughtId });

    res.json(findThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// make thought
const makeThought = async (req, res) => {
  const { thoughtText, username, userId } = req.body;
  try {
    const makeNewThought = await Thought.create({ thoughtText, username });
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { thoughts: makeNewThought._id } },
      { new: true }
    );

    res.json({ makeNewThought, updateUser });
  } catch (err) {
    res.status(500).json(err);
  }
};

// update user thought
const updateUserThought = async (req, res) => {
  try {
    const updatedUserThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $set: { ...req.body } },
      { new: true }
    );

    res.json(updatedUserThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete user thought
const deleteUserThought = async (req, res) => {
  try {
    const deletedUserThought = await Thought.deleteOne({
      _id: req.params.thoughtId,
    });

    res.json(deletedUserThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// add friend id to thought
const addUserReaction = async (req, res) => {
  const { thoughtId } = req.params;
  const { reactionBody, username } = req.body;
  try {
    const updatedUserThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $addToSet: { reactions: { username, reactionBody } } },
      { new: true }
    );

    res.json(updatedUserThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete friend id from thought
const deleteUserReaction = async (req, res) => {
  const { thoughtId } = req.params;
  const { reactionId } = req.body;
  try {
    const updatedUserThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { reactionId } } },
      { new: true }
    );

    res.json(updatedUserThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  fetchThoughts,
  fetchSingleThought,
  makeThought,
  updateUserThought,
  deleteUserThought,
  addUserReaction,
  deleteUserReaction,
};
