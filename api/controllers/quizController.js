const { Quiz, Answer } = require('../models/game/quizAnswerModel');
const { Theme } = require('../models/game/themeQuizModel');


async function getAll(req, res){
    try{
        const { ID_Quiz, Question_Quiz } = req.query;
        const where = { };
        if(ID_Quiz){
            where.ID_Quiz = ID_Quiz
        }
        if(Question_Quiz){
            where.Question_Quiz = Question_Quiz
        }
        const quizs = await Quiz.findAll({ where,
            include: [{
                model: Answer,
                through: { attributes: [] }
            },
            {
                model: Theme,

            }
            ] 
         });

        res.status(200).json(quizs);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function getById(req, res){
    try{
        const { id } = req.params;

        const quizs = await Quiz.findByPk(id, 
            {
                include: [{
                    model: Answer,
                    through: { attributes: [] }
                },
                {
                    model: Theme,
                    attributes: ["Title_Theme"]
                }
                ]
            }
        );

        res.status(200).json(quizs);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};



async function createQuiz(req, res){
    try{
        const { question } = req.params;

        const quiz = await Quiz.create({ 
            Question_Quiz: question
        });

        res.status(200).json(quiz);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function patchQuiz(req, res){
    try{
        const { Question_Quiz } = req.query;
        const criteria = { };
        const { id } = req.params
        if(Question_Quiz){
            criteria.Question_Quiz = Question_Quiz
        }
        const quiz = await Quiz.update(criteria, { where: { ID_Quiz: id } });

        res.status(200).json(quiz);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function deleteQuiz(req, res){
    try{
        const { id } = req.params;
        const quiz = await Quiz.destroy({ where: {ID_Quiz: id} });

        res.status(200).json(quiz);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function deleteQuizQuery(req, res){
    try{
        const { ID_Quiz, Question_Quiz } = req.query;
        const where = { };
        if(ID_Quiz){
            where.ID_Quiz = ID_Quiz
        }
        if(Question_Quiz){
            where.Question_Quiz = Question_Quiz
        }
        const Quiz = await Quiz.destroy({ where });

        res.status(200).json(Quiz);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

module.exports = { getAll, getById, createQuiz, patchQuiz, deleteQuizQuery, deleteQuiz };