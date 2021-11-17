const Todo = require("../model/todo");
module.exports.createTodo = async (req, res, next) => {
  try {
    // console.log("body", req.body);
    let createObj = new Todo({
      name: req.body.name,
      task: req.body.task,
      status: req.body.status,
      time_to_complete: req.body.time_to_complete,
    });
    createObj = await createObj.save();
    // console.log(createObj);
    res.json({ message: "Task Added!!", todo: createObj });
  } catch {
    (err) => {
      console.log("error", err);
      res.status(400).json({ error: err });
    };
  }
};
module.exports.getTodo = async (req, res, next) => {
  try {
    let getTask = await Todo.find();
    if (getTask) {
      res.json({ data: getTask });
    } else {
      res.json({ error: "No Task Added!" });
    }
  } catch {
    (err) => {
      console.log("error", err);
      res.status(400).json({ error: err });
    };
  }
};
module.exports.updateTodo = async (req, res, next) => {
  try {
    const { _id } = req.params;
    let updateTask = await Todo.findOneAndUpdate({ _id }, req.body);
    if (updateTask) {
      res.json({ message: "Task Updated SuccessFully!!" });
    } else {
      res.json({ error: "Some error Occurred!!" });
    }
  } catch {
    (err) => {
      console.log("error", err);
      res.status(400).json({ error: err });
    };
  }
};
module.exports.deleteTodo = async (req, res, next) => {
  try {
    const { _id } = req.params;
    let DeleteTask = await Todo.findOneAndDelete({ _id });
    if (DeleteTask) {
      res.json({ message: "Task Deleted SuccessFully!!" });
    } else {
      res.json({ error: "Some error Occurred!!" });
    }
  } catch {
    (err) => {
      console.log("error", err);
      res.status(400).json({ error: err });
    };
  }
};
