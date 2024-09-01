const port = 4000;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const env = require("dotenv");
env.config();

const mongoose = require("mongoose");

// Middleware configuration
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

const logStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a"
});

const errorStream = fs.createWriteStream(path.join(__dirname, "error.txt"), {
  flags: "a"
});

const authRoutes = require("./routes/auth");
const quizRoutes = require('./routes/quizRoutes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging Middleware
app.use((req, res, next) => {
  const now = new Date();
  const time = ` ${now.toLocaleTimeString()} `;
  const log = `${req.method} ${req.originalUrl} ${time}`;
  logStream.write(log + "\n");
  next();
});

// Route Setup
app.use("/api/auth", authRoutes);
app.use('/api', quizRoutes);



app.get("/", (req, res) => {
  res.status(200).send("Backend Capstone");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  const now = new Date();
  const time = ` ${now.toLocaleTimeString()} `;
  const log = `${req.method} ${req.originalUrl} ${time}`;
  errorStream.write(log + err.stack + "\n");
  res.status(500).send("Internal server error");
  next(err)
});

// 404 Handling Middleware
app.use((req, res, next) => {
  const now = new Date();
  const time = ` ${now.toLocaleTimeString()} `;
  const log = `${req.method} ${req.originalUrl} ${time}`;
  errorStream.write(log + "\n");
  res.status(404).send("Route not found");
});

// Database Connection & Server Startup
app.listen(port,()=>{
    mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>console.log("connected to Db"))
    .catch((error)=>console.log(error))
});
