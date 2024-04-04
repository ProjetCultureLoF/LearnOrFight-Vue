const express = require("express");

const departmentQuizRouter = express.Router();

const controller = require("../controllers/departmentQuizzesController");

departmentQuizRouter.post(
  "/:ID_Quiz/:ID_Department",
  controller.addQuizDepartment
);

departmentQuizRouter.get("/", controller.getAll);

departmentQuizRouter.delete("/:id", controller.deleteQuiz);

module.exports = departmentQuizRouter;
