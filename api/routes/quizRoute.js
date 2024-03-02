const express = require('express');

const quizRouter = express.Router();

const controller = require('../controllers/quizController');

quizRouter.post('/:question', controller.createQuiz);

quizRouter.get('/', controller.getAll);
quizRouter.get('/byId/:id', controller.getById);

quizRouter.patch('/:id', controller.patchQuiz);

quizRouter.delete('/byId/:id', controller.deleteQuiz);
quizRouter.delete('/query', controller.deleteQuizQuery);

module.exports = quizRouter;