const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessdb", { useNewUrlParser: true, useUnifiedTopology: true });


app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "public/stats.html"));
});

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    // .populate("exercises")
    .then(dbWorkout => {
      res.json(dbWorkout);
      console.log(dbWorkout)
      console.log(dbWorkout[0].exercises)
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/api/workouts/:id", (req, res) => {
    db.Workout.findById(req.params.id)
      .populate("exercises")
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .populate("exercises")
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

app.post("/api/workouts", ({body}, res) => {
    console.log(body)
    db.Exercise.create(body)
      .then(({_id}) => db.Workout.findByIdAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.put("/api/workouts/:id", ({body}, res) => {
      console.log(body)
    db.Exercise.create(body)
      .then(({_id}) => db.Workout.findByIdAndUpdate(workout._id, { $push: { exercises: _id } }, { new: true }))
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

// const _db = mongoose.connection;
// _db.on('error', console.error.bind(console, 'connection error:'));
// _db.once('open', function() {
//     console.log('connected successfully!')
// });
