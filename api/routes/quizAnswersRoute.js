const express = require('express');

const quizAnswerRouter = express.Router();

const controller = require('../controllers/quizAnswerController');

quizAnswerRouter.post('/:quizId/:answerId/:is', controller.createQuizAnswer);

quizAnswerRouter.get('/', controller.getAll);
quizAnswerRouter.get('/:id', controller.getById);

quizAnswerRouter.patch('/:quizId/:answerId/:is', controller.patchQuizAnswer);

quizAnswerRouter.delete('/byId/:id', controller.deleteQuizAnswer);
quizAnswerRouter.delete('/query', controller.deleteQuizAnswerQuery);

module.exports = quizAnswerRouter;