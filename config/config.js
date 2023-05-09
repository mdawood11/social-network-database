const { connect, config, set } = require("mongoose");

const connectionString =
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1:27017/social-network-database";

set("strictQuery", false);
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = config;
