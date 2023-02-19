let mongoose = require("mongoose");
mongoose.set("strictQuery", false);
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  followers: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
});

module.exports = mongoose.model("User", UserSchema);
