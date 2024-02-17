const express = require('express');

const scoresRouter = express.Router();
const controller = require('../controllers/scoresController')

scoresRouter.post('/:userId/:departmentId/:amount', controller.createUserScore);

scoresRouter.get('/', controller.getAll);
scoresRouter.get('/user/:userId', controller.getUserScores);
scoresRouter.get('/user/:userId/:departmentId', controller.getUserDepartementScore);

scoresRouter.patch('/:userId/:departmentId/:amount', controller.patchUserDepartementScore);

scoresRouter.delete('/', controller.deleteScore);

module.exports = scoresRouter;