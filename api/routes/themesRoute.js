const express = require('express');

const themesRouter = express.Router();

const controller = require('../controllers/themesController')

themesRouter.post('/:title', controller.createTheme);

themesRouter.get('/', controller.getAll);
themesRouter.get('/:id', controller.getById);

themesRouter.patch('/:id', controller.patchTheme);

themesRouter.delete('/byId/:id', controller.deleteTheme);
themesRouter.delete('/query', controller.deleteThemeQuery);

module.exports = themesRouter