let mongoose = require("mongoose");
mongoose.set("strictQuery", false);
let Schema = mongoose.Schema;

let InstapostSchema = new Schema({
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    require: true,
  },
  photo: [
    {
      type: String,
      require: true,
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comment: [
    {
      text: String,
      postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

module.exports = mongoose.model("Instapost", InstapostSchema);
