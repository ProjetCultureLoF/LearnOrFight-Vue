const express = require('express');

const usersRouter = express.Router();

const controller = require('../controllers/usersController')

usersRouter.post('/:name/:mail/:password/:token/:clanId', controller.createUser)

usersRouter.get('/', controller.getAll)
usersRouter.get('/byToken', controller.getByToken)

module.exports = usersRouter