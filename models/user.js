const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  workouts: [
    {
      type: Schema.Types.ObjectId,
      date: { type: Date, default: Date.now },
      ref: "Workout"
    }
  ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
