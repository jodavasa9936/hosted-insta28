const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },Photo: {
    type: String,
    require: true
  },
  followers: [{ type: ObjectId, ref: "USER" }],
  following: [{ type: Object, ref: "USER" }],
});

module.exports = mongoose.model("USER", userSchema);
