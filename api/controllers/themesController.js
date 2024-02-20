const { Theme, Department } = require('../models/game/themeModel');
const { Quiz } = require('../models/game/themeQuizModel');


async function getAll(req, res){
    try{
        const { ID_Theme, Title_Theme } = req.query;
        const where = { };
        if(ID_Theme){
            where.ID_Theme = ID_Theme
        }
        if(Title_Theme){
            where.Title_Theme = Title_Theme
        }
        const themes = await Theme.findAll({ where, 
            include: [{
                model: Department,
                through: { attributes: [] } 
            },
            {
                model: Quiz,
                
            },
            ] 
        });

        res.status(200).json(themes);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function getById(req, res){
    try{
        const { id } = req.params;

        const themes = await Theme.findAll({ where: { ID_Theme: id }, 
            include: [{
                model: Department,
                through: { attributes: [] } 
            }] 
        });

        res.status(200).json(themes);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function createTheme(req, res){
    try{
        const { title } = req.params;

        const theme = await Theme.create({ 
            Title_Theme: title
        });

        res.status(200).json(theme);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function patchTheme(req, res){
    try{
        const { Title_Theme } = req.query;
        const criteria = { };
        const { id } = req.params
        if(Title_Theme){
            criteria.Title_Theme = Title_Theme
        }
        const theme = await Theme.update(criteria, { where: { ID_Theme: id } });

        res.status(200).json(theme);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function deleteTheme(req, res){
    try{
        const { id } = req.params;
        const theme = await Theme.destroy({ where: {ID_Theme: id} });

        res.status(200).json(theme);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function deleteThemeQuery(req, res){
    try{
        const { ID_Theme, Title_Theme } = req.query;
        const where = { };
        if(ID_Theme){
            where.ID_Theme = ID_Theme
        }
        if(Title_Theme){
            where.Title_Theme = Title_Theme
        }
        const Theme = await Theme.destroy({ where });

        res.status(200).json(Theme);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

module.exports = { getAll, getById, createTheme, patchTheme, deleteThemeQuery, deleteTheme };