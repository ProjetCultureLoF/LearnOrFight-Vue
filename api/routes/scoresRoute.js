const express = require('express');

const scoresRouter = express.Router();
const controller = require('../controllers/scoresController')

scoresRouter.post('/:userToken/:depName/:amount', controller.createUserScore);

scoresRouter.get('/', controller.getAll);
scoresRouter.get('/:userId', controller.getUserScores);
scoresRouter.get('/:userToken/:depName', controller.getUserDepartementScore);

scoresRouter.patch('/:userName/:depName/:amount', controller.patchUserDepartementScore);

scoresRouter.delete('/', controller.deleteScore);

module.exports = scoresRouter;