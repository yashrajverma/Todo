const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { database } = require("./db");
const app = express();
const PORT = process.env.PORT || 5050;
const router = require("./router/todo");
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb" }));
app.use(router);
mongoose.connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", (res) => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log("Server Listening on Port", PORT);
  });
});
