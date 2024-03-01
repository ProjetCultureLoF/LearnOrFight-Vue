const express = require('express');

const departmentsRouter = express.Router();
const controller = require('../controllers/departmentsController')

departmentsRouter.post('/:name/:code', controller.createDepartment);
departmentsRouter.post('/theme/:code/:title', controller.departmentAddTheme);

departmentsRouter.get('/', controller.getAll);
departmentsRouter.get('/byId/:id', controller.getById);

departmentsRouter.patch('/:id', controller.patchDepartment);

departmentsRouter.delete('/byId/:id', controller.deleteDepartment);
departmentsRouter.delete('/query', controller.deleteDepartmentQuery);

module.exports = departmentsRouter;