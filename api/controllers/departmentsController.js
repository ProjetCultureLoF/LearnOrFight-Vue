const { Department } = require('../models/departmentModel');


async function getById(req, res){
    try{
        const { id } = req.params;
        const department = await Department.findOne({ where: {ID_Department: id} });

        res.status(200).json(department);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function getAll(req, res){
    try{
        const { ID_Department, Name_Department } = req.query;
        const where = { };
        if(ID_Department){
            where.ID_Department = ID_Department
        }
        if(Name_Department){
            where.Name_Department = Name_Department
        }
        const departments = await Department.findAll({ where });

        res.status(200).json(departments);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function createDepartment(req, res){
    try{
        const { name } = req.params;

        const department = await Department.create({ 
            Name_Department: name
        });

        res.status(200).json(department);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function patchDepartment(req, res){
    try{
        const { Name_Department } = req.query;
        const criteria = { };
        const { id } = req.params
        if(Name_Department){
            criteria.Name_Department = Name_Department
        }
        const department = await Department.update(criteria, { where: { ID_Department: id } });

        res.status(200).json(department);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function deleteDepartment(req, res){
    try{
        const { id } = req.params;
        const department = await Department.destroy({ where: {ID_Department: id} });

        res.status(200).json(department);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function deleteDepartmentQuery(req, res){
    try{
        const { ID_Department, Name_Department } = req.query;
        const where = { };
        if(ID_Department){
            where.ID_Department = ID_Department
        }
        if(Name_Department){
            where.Name_Department = Name_Department
        }
        const Department = await Department.destroy({ where });

        res.status(200).json(Department);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

module.exports = { getById, getAll, createDepartment, patchDepartment, deleteDepartmentQuery, deleteDepartment };