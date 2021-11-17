const mongoose = require("mongoose");
const todo = new mongoose.Schema({
  name: { type: String, required: true },
  task: { type: String, required: true },
  status: { type: String, required: true },
  time_to_complete: { type: Date },
});
module.exports = mongoose.model("todo", todo);
