const config = require("../config/config");
const { Thought, User } = require("../models");
const { getUserData, getThoughtData, getReactionData } = require("./data");

config.on("error", (err) => err);

config.once("open", async () => {
  let promises = [];
  console.log("connected");

  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = await User.create(getUserData);
  const thoughts = await Thought.create(getThoughtData);

  const userIds = users.map((obj) => {
    return obj._id.toString();
  });
  const thoughtIds = thoughts.map((obj) => {
    return obj._id.toString();
  });

  userIds.forEach((id, i) => {
    const getFriend = User.updateMany(
      { _id: { $ne: id } },
      { $addToSet: { friends: id } }
    );
    const getThought = User.findOneAndUpdate(
      { _id: id },
      { $addToSet: { thoughts: thoughtIds[i] } }
    );
    const getReaction = Thought.findByIdAndUpdate(
      thoughtIds[i],
      { $addToSet: { reactions: getReactionData[i] } },
      { new: true }
    );
    promises.push(getFriend, getThought, getReaction);
  });

  await Promise.all(promises);
  console.info("Seeding complete! 🌴");
  process.exit(0);
});
