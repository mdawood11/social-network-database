const { Schema, model } = require("mongoose");
const schemaReaction = require("./reaction");

const schemaThought = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: new Date(),
      get: (date) => date.toLocaleString(),
    },
    username: {
      type: String,
      require: true,
    },
    reactions: [schemaReaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

schemaThought.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", schemaThought);

module.exports = Thought;
