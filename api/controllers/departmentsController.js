const { Department, Theme } = require('../models/game/themeModel');


async function getById(req, res){
    try{
        const { id } = req.params;
        const department = await Department.findOne({ 
            where: {ID_Department: id}, 
            include: [{
                model: Theme,
                through: { attributes: [] } 
            }]
         });

        res.status(200).json(department);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function getDepartmentsQuizes(req, res){
    try{
        const { ID_Department, Name_Department, Code_Department } = req.query;
        const where = { };
        if(ID_Department){
            where.ID_Department = ID_Department
        }
        if(Name_Department){
            where.Name_Department = Name_Department
        }
        if(Code_Department){
            where.Code_Department = Code_Department
        }
        const departments = await Department.findAll( {
            include: [{
                model: Theme,
                through: { attributes: [] } 
            }]
        });
        res.status(200).json(departments);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function getAll(req, res){
    try{
        const { ID_Department, Name_Department, Code_Department } = req.query;
        const where = { };
        if(ID_Department){
            where.ID_Department = ID_Department
        }
        if(Name_Department){
            where.Name_Department = Name_Department
        }
        if(Code_Department){
            where.Code_Department = Code_Department
        }
        const departments = await Department.findAll( { where,
            include: [{
                model: Theme,
                through: { attributes: [] } 
            }]
        });
        res.status(200).json(departments);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function departmentAddTheme(req, res){
    try{
        const { code, title } = req.params;
       
        const department = await Department.findOne({ 
            where: {Code_Department: code } 
        });
        const theme = await Theme.findOne({ 
                where: {Title_Theme: title } 
        });
        
        await department.setThemes([]); 
        await department.addTheme(theme);

        const departmentTheme = await Department.findOne({ 
            where: {Code_Department: code } 
        });

        res.status(200).json(departmentTheme);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function createDepartment(req, res){
    try{
        const { name, code } = req.params;

        const department = await Department.create({ 
            Name_Department: name, Code_Department: code
        });

        res.status(200).json(department);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function patchDepartment(req, res){
    try{
        const { Name_Department, Code_Department } = req.query;
        const criteria = { };
        const { id } = req.params
        if(Name_Department){
            criteria.Name_Department = Name_Department
        }
        if(Code_Department){
            where.Code_Department = Code_Department
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
        const { ID_Department, Name_Department, Code_Department } = req.query;
        const where = { };
        if(ID_Department){
            where.ID_Department = ID_Department
        }
        if(Name_Department){
            where.Name_Department = Name_Department
        }
        if(Code_Department){
            where.Code_Department = Code_Department
        }
        const Department = await Department.destroy({ where });

        res.status(200).json(Department);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

module.exports = { getById, getAll, createDepartment, departmentAddTheme, patchDepartment, deleteDepartmentQuery, deleteDepartment };