const { QuizAnswer, Quiz, Answer } = require('../models/game/quizAnswerModel');


async function getAll(req, res){
    try{
        const { quizIDQuiz, answerIDAnswer, ID_QuizAnswer, Is_QuizAnswer } = req.query;
        const where = { };
        if(quizIDQuiz){
            where.quizIDQuiz = quizIDQuiz
        }
        if(answerIDAnswer){
            where.answerIDAnswer = answerIDAnswer
        }
        if(ID_QuizAnswer){
            where.ID_QuizAnswer = ID_QuizAnswer
        }
        if(Is_QuizAnswer){
            where.Is_QuizAnswer = Is_QuizAnswer
        }
        const quizAnswer = await QuizAnswer.findAll({ where,
            include: [
                {
                    model: Answer
                },
                {
                    model: Quiz
                }
            ]
        });

        res.status(200).json(quizAnswer);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function getById(req, res){
    try{
        const { id } = req.params;

        const quizAnswer = await QuizAnswer.findOne({ where: { ID_QuizAnswer: id } });

        res.status(200).json(quizAnswer);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function createQuizAnswer(req, res){
    try{
        const { quizId, answerId, is } = req.params;

        const quizAnswer = await QuizAnswer.create({ 
            quizIDQuiz: quizId, answerIDAnswer: answerId, Is_QuizAnswer: is
        });

        res.status(200).json(quizAnswer);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function patchQuizAnswer(req, res){
    try{
        const { quizId, answerId, is } = req.params;
        
        const quizAnswer = await QuizAnswer.update(
            {Is_QuizAnswer: is},
            { where: { quizIDQuiz: quizId, answerIDAnswer: answerId } 
        });

        res.status(200).json(quizAnswer);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function deleteQuizAnswer(req, res){
    try{
        const { id } = req.params;
        const quizAnswer = await QuizAnswer.destroy({ where: {ID_QuizAnswer: id} });

        res.status(200).json(quizAnswer);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function deleteQuizAnswerQuery(req, res){
    try{
        const { quizIDQuiz, answerIDAnswer, ID_QuizAnswer } = req.query;
        const where = { };
        if(quizIDQuiz){
            where.quizIDQuiz = quizIDQuiz
        }
        if(answerIDAnswer){
            where.answerIDAnswer = answerIDAnswer
        }
        if(ID_QuizAnswer){
            where.ID_QuizAnswer = ID_QuizAnswer
        }
        const quizAnswer = await QuizAnswer.destroy({ where });

        res.status(200).json(quizAnswer);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

module.exports = { getAll, getById, createQuizAnswer, patchQuizAnswer, deleteQuizAnswerQuery, deleteQuizAnswer };