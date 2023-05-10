const { Schema, model } = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const schemaUser = new Schema(
  {
    username: {
      type: String,
      required: "Required username",
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: "Required email",
      lowercase: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

schemaUser.plugin(uniqueValidator);
schemaUser.virtual("friendCount").get(function () {
  return this.friends.length;
});

const user = model("user", schemaUser);

module.exports = user;
