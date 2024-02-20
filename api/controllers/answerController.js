const { Answer } = require('../models/game/answerModel');


async function getAll(req, res){
    try{
        const { ID_Answer, Text_Answer } = req.query;
        const where = { };
        if(ID_Answer){
            where.ID_Answer = ID_Answer
        }
        if(Text_Answer){
            where.Text_Answer = Text_Answer
        }
        const answer = await Answer.findAll({ where });

        res.status(200).json(answer);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function getById(req, res){
    try{
        const { id } = req.params;

        const answer = await Answer.findAll({ where: { ID_Answer: id } });

        res.status(200).json(answer);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function createAnswer(req, res){
    try{
        const { text } = req.params;

        const answer = await Answer.create({ 
            Text_Answer: text
        });

        res.status(200).json(answer);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function patchAnswer(req, res){
    try{
        const { Text_Answer } = req.query;
        const criteria = { };
        const { id } = req.params
        if(Text_Answer){
            criteria.Text_Answer = Text_Answer
        }
        const answer = await Answer.update(criteria, { where: { ID_Answer: id } });

        res.status(200).json(answer);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function deleteAnswer(req, res){
    try{
        const { id } = req.params;
        const answer = await Answer.destroy({ where: {ID_Answer: id} });

        res.status(200).json(answer);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function deleteAnswerQuery(req, res){
    try{
        const { ID_Answer, Text_Answer } = req.query;
        const where = { };
        if(ID_Answer){
            where.ID_Answer = ID_Answer
        }
        if(Text_Answer){
            where.Text_Answer = Text_Answer
        }
        const Answer = await Answer.destroy({ where });

        res.status(200).json(Answer);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

module.exports = { getAll, getById, createAnswer, patchAnswer, deleteAnswerQuery, deleteAnswer };