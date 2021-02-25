
# Fitness Tracker

## Table of Contents
* [Description](#description)


## Description

This app tracks workouts and shows an overall summary of workout stats to help the user successfully meet their fitness goals. [fitnesstracker_home](./assets/home.png)
[fitnesstracker_dashboard](./assets/dashboard.png)
[fitnesstracker_addExercise](./assets/addExercise.png)
       
Purpose: This app was created to allow the user to track each exercise of their workout and then summarize their workout stats, showing a summary of their last workout, as well as a summary of all of their workout stats. A workout dashboard provides graphs and pie charts that help the user to visualize how much of their total duration and total weight can be attributed to each exercise. Giving users this tool helps to motivate them so that they can successfully reach their fitness goals.

The app uses MongoDB to store the users workout data. API calls are made to the database to populate the workout summary on the home page and the stats for the workout dashboard. Mongoose and Express are used on the back end to set the routes for posting, updating, and retrieving data. Javascript is then used to dynamically populate information on the client side.

Technologies Used

* Express.js
* Mongoose
* MongoDB
* MongoAtlas

Challenges: The biggest challenge was formatting the Mongoose Schemaproperly so that the seed.js would work.

Lessons Learned: I learned the importance of including 'require' for the various schema properties. The most interesting lesson was the use of the method virtual() within the schema to create data only when it is called.

Future Development: In the future, I plan to include the ability to view and edit previous entries for exercises. There is potential to expand upon the dashboardto provide a more detailed analysis of the user's workouts.
