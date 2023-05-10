const { User, Thought } = require("../models");

// fetch all user
const fetchUsers = async function (req, res) {
  try {
    const users = await User.find({}).exec();

    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

//  fetch single user
const fetchSingleUser = async function (req, res) {
  try {
    const findUser = await User.find({ _id: req.params.userId })
      .populate(["friends", "thoughts"])
      .exec();

    res.json(findUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// generate user
const generateUser = async function (req, res) {
  const { username, email } = req.body;

  try {
    const generatenewUser = await User.create({ username, email });

    res.json(generatenewUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update user
const updateUser = async function (req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: { ...req.body } },
      { new: true }
    );

    updatedUser
      ? res.json(updatedUser)
      : res.json({ message: "No user found" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// remove user
const removeUser = async function (req, res) {
  try {
    const removedUser = await User.findByIdAndDelete(req.params.userId).exec();

    if (removedUser) {
      await Thought.deleteMany({ username: removedUser.username });

      res.json(removedUser);
    } else res.json({ message: "No user deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// add new friend id to user
const addNewFriend = async function (req, res) {
  const { userId, friendId } = req.params;
  try {
    const results = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    ).exec();

    results ? res.json(results) : res.json({ message: "No user found" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// remove friend id from user
const removeFriend = async function (req, res) {
  const { userId, friendId } = req.params;
  try {
    const results = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    ).exec();

    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  fetchUsers,
  fetchSingleUser,
  generateUser,
  updateUser,
  removeUser,
  addNewFriend,
  removeFriend,
};
