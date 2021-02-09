const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");


const PORT = process.env.PORT || 8080;

const db = require("./models");


const app = express();

const databaseName = "workout_db"

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log(`Successfully connected to database: ${databaseName}`))


app.use("/api", require("./routes/apiRoutes.js"));
app.use("/", require("./routes/htmlRoutes.js"));


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});