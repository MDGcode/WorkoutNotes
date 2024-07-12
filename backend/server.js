require("dotenv").config();

const express = require("express");
const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const cors = require("cors");
const app = express();
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//MIDDLEWARE
app.use(express.json());
//ROUTES
app.use("/api/workouts", workoutRoutes);

//connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    //listen for requests
    if (process.env.NODE_ENV === "dev") {
      app.listen(8080, () => {
        console.log("Connected to db & listening on port 8080");
      });
    }
  })
  .catch((error) => {
    console.log(error);
  });

module.exports.handler = serverless(app);
