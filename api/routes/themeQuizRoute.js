const express = require('express');

const themeQuizRouter = express.Router();

const controller = require('../controllers/themeQuizController');

themeQuizRouter.post('/:quizId/:title', controller.createThemeQuiz);

themeQuizRouter.get('/', controller.getAll);
themeQuizRouter.get('/:id', controller.getById);

themeQuizRouter.patch('/:id', controller.patchThemeQuiz);

themeQuizRouter.delete('/byId/:id', controller.deleteThemeQuiz);
themeQuizRouter.delete('/query', controller.deleteThemeQuizQuery);

module.exports = themeQuizRouter;