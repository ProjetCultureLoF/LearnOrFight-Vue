const express = require('express');

const answerRouter = express.Router();

const controller = require('../controllers/answerController');

answerRouter.post('/:text', controller.createAnswer);

answerRouter.get('/', controller.getAll);
answerRouter.get('/:id', controller.getById);

answerRouter.patch('/:id', controller.patchAnswer);

answerRouter.delete('/byId/:id', controller.deleteAnswer);
answerRouter.delete('/query', controller.deleteAnswerQuery);

module.exports = answerRouter;