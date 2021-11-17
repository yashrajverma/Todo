const router = require("express").Router();
const Controller = require("../controller/todo");
router.post("/create", Controller.createTodo);
router.get("/get", Controller.getTodo);
router.put("/update/:_id", Controller.updateTodo);
router.delete("/delete/:_id", Controller.deleteTodo);
module.exports = router;
