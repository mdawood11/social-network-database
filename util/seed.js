const config = require("../config/config");
const { thought, user } = require("../models");
const { getUserData, getThoughtData, getReactionData } = require("./data");

config.on("error", (err) => err);

config.once("open", async () => {
  let promises = [];
  console.log("connected");

  await thought.deleteMany({});
  await user.deleteMany({});

  const users = await user.create(getUserData);
  const thoughts = await thought.create(getThoughtData);

  const userIds = users.map((obj) => {
    return obj._id.toString();
  });
  const thoughtIds = thoughts.map((obj) => {
    return obj._id.toString();
  });

  userIds.forEach((id, i) => {
    const getFriend = user.updateMany(
      { _id: { $ne: id } },
      { $addToSet: { friends: id } }
    );
    const getThought = user.findOneAndUpdate(
      { _id: id },
      { $addToSet: { thoughts: thoughtIds[i] } }
    );
    const getReaction = thought.findByIdAndUpdate(
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
