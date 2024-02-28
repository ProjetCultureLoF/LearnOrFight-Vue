const { ThemeQuiz, Theme, Quiz } = require('../models/game/themeQuizModel');


async function getAll(req, res){
    try{
        const { quizIDQuiz, themeIDTheme, ID_ThemeQuiz, Used_ThemeQuiz } = req.query;
        const where = { };
        if(quizIDQuiz){
            where.quizIDQuiz = quizIDQuiz
        }
        if(themeIDTheme){
            where.themeIDTheme = themeIDTheme
        }
        if(ID_ThemeQuiz){
            where.ID_ThemeQuiz = ID_ThemeQuiz
        }
        if(Used_ThemeQuiz){
            where.Used_ThemeQuiz = Used_ThemeQuiz
        }
        const themeQuiz = await ThemeQuiz.findAll({ where,
            include: [
                {
                    model: Theme
                },
                {
                    model: Quiz
                }
            ]
        });

        res.status(200).json(themeQuiz);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function getById(req, res){
    try{
        const { id } = req.params;

        const themeQuiz = await ThemeQuiz.findOne({ where: { ID_ThemeQuiz: id }, 
            include: [
                {
                    model: Theme
                },
                {
                    model: Quiz
                }
            ] 
        });

        res.status(200).json(themeQuiz);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function createThemeQuiz(req, res){
    try{
        const { quizId, themeId } = req.params;

        const themeQuiz = await ThemeQuiz.create({ 
            quizIDQuiz: quizId, themeIDTheme: themeId
        });

        res.status(200).json(themeQuiz);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function patchThemeQuiz(req, res){
    try{
        const { quizId, themeId, used } = req.params;
        
        const themeQuiz = await ThemeQuiz.update(
            {Used_ThemeQuiz: used},
            { where: { quizIDQuiz: quizId, themeIDTheme: themeId } 
        });

        res.status(200).json(themeQuiz);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function deleteThemeQuiz(req, res){
    try{
        const { id } = req.params;
        const themeQuiz = await ThemeQuiz.destroy({ where: {ID_ThemeQuiz: id} });

        res.status(200).json(themeQuiz);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function deleteThemeQuizQuery(req, res){
    try{
        const { quizIDQuiz, themeIDTheme, ID_ThemeQuiz } = req.query;
        const where = { };
        if(quizIDQuiz){
            where.quizIDQuiz = quizIDQuiz
        }
        if(themeIDTheme){
            where.themeIDTheme = themeIDTheme
        }
        if(ID_ThemeQuiz){
            where.ID_ThemeQuiz = ID_ThemeQuiz
        }
        const themeQuiz = await ThemeQuiz.destroy({ where });

        res.status(200).json(themeQuiz);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

module.exports = { getAll, getById, createThemeQuiz, patchThemeQuiz, deleteThemeQuizQuery, deleteThemeQuiz };