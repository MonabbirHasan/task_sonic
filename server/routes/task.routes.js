const express = require("express");
const authorization = require("../middleware/authentication");
const TaskController = require("../controller/task.controller");
const router = express.Router();

router.use(authorization);

router.get("/", TaskController.all_tasks);
router.post("/", TaskController.create_tasks);
router.get("/:task_id", TaskController.single_tasks);
router.patch("/:task_id", TaskController.update_tasks);
router.delete("/:task_id", TaskController.delete_tasks);
router.get("/user/:user_id", TaskController.single_user_tasks);
router.patch("/:task_id/status", TaskController.update_task_status);
module.exports = router;
