const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: { type: Date, default: new Date() },
  exercises: [
    {
      type: {
        type: String,
        required: "Choose an exercise type"
      },
      name: {
        type: String,
        required: "Please give this exercise a name"
      },
      duration: { 
        type: Number,
        required: "Please put a numberfor the duration"
      },
      weight: Number,
      reps: Number,
      sets: Number,
      distance: Number
    }
  ]
},
{
  toJSON: {
    // include any virtual properties when data is requested
    virtuals: true
  }
});

// adds a dynamically-created property to schema
WorkoutSchema.virtual("totalDuration").get(function () {
  // "reduce" array of exercises down to just the sum of their durations
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
