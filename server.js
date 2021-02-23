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
    .then(dbWorkout => {
      res.json(dbWorkout);
      // console.log(dbWorkout)
      // console.log(dbWorkout[0].exercises)
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/api/workouts/:id", (req, res) => {
    console.log(req.params.id)
    db.Workout.findById(req.params.id)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

app.get("/api/workouts/range", (req, res) => {
    console.log(req)
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

app.post("/api/workouts", (req, res) => {
    
    db.Workout.create({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.put("/api/workouts/:id", (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    db.Workout.findByIdAndUpdate({ _id: req.params.id}, { $push: { exercises: req.body } }, { new: true })
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
