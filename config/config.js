const { connect, connection, set } = require("mongoose");

const connectionConfig =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetworkDB";

set("strictQuery", false);
connect(connectionConfig, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
