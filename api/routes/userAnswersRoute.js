const express = require("express");

const userAnswerRouter = express.Router();

const controller = require("../controllers/userAnswersController");

userAnswerRouter.post("/:token/:quizId/:answer", controller.addUserAnswer);

userAnswerRouter.get("/", controller.getAll);

userAnswerRouter.delete("/", controller.deleteUserAnswer);

module.exports = userAnswerRouter;
