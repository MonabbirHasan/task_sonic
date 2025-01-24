require("./config/config");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

//////////////////////////////
// IMPORT ALL ROUTE FILE PATH
//////////////////////////////
const user_router = require("./routes/users.routes");
const task_router = require("./routes/task.routes");
//////////////////////////////
// MIDDLEWARE CONFIGURATION
//////////////////////////////
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);
//////////////////////////
// DEFINE ALL ROUTE HERE
//////////////////////////
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.use("/api/users", user_router);
app.use("/api/tasks", task_router);
////////////////////////
// ROUTE ERROR HANLDER
////////////////////////
app.use((req, res) => {
  res.status(404).json({ message: "This Route Is Not Found!" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.message);
  res.status(500).json({ message: "Something Broke!", error: err.message });
});
/////////////////////////////////////
// EXPORT APP FOR USE IN INDEX.JS
/////////////////////////////////////

module.exports = app;
