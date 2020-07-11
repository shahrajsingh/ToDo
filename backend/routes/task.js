const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/task");
const checkAuth = require("../middleware/check-auth");

router.post("", checkAuth, TaskController.createTask);


router.get("/:UserId", checkAuth, TaskController.getTasks);

router.get("/imp/:UserId", checkAuth, TaskController.getimptask);

router.get("/md/:UserId", checkAuth, TaskController.getmydaytasks);

router.get("/ctask/:UserId", checkAuth, TaskController.getCompletedTask);


router.get("/search/:query/:user", checkAuth, TaskController.searchTask);

router.put("/completetask/:UserId", checkAuth, TaskController.completeTask);

router.put("/uncompletetask/:UserId", checkAuth, TaskController.uncompleteTask);

router.put("/imp/:UserId", checkAuth, TaskController.markImportant);

router.put("/nimp/:UserId", checkAuth, TaskController.marknImportant);


router.delete("/:id/:userid", checkAuth, TaskController.deleteTask);

module.exports = router;
