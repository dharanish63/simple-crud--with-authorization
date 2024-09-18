const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");
const createError = require("http-errors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to the world");
});

app.use("/", router);

app.use("/", (_, res, next) => {
  return next(createError(404, "Resource not found"));
});

app.use((error, req, res, next) => {
  if (!error) next();
  const status = error?.status || 500;
  const message = error?.message || "Unable to handle request";
  res.status(status).json({ error: { message }, status });
});

const PORT = process.env.PORT || 5000;
mongoose
  .connect(
    "mongodb+srv://dharanish235:Dharanish001@node.6y27j.mongodb.net/sample"
  )
  .then(() => {
    console.log("database connected");
    app.listen(PORT, () => {
      console.log(`The server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("connection failed");
  });
