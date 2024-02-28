const express = require('express');

const usersRouter = express.Router();

const controller = require('../controllers/usersController')

usersRouter.post('/:name/:mail/:password/:token/:isAdmin/:clanId', controller.createUser)

usersRouter.get('/', controller.getAll)
usersRouter.get('/byToken', controller.getByToken)

usersRouter.patch('/:id', controller.patchUser);

usersRouter.delete('/', controller.deleteUser);

module.exports = usersRouter