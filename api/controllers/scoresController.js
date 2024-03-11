const { Score, User, Department } = require('../models/client/scoreModel');
User.sync({alter: true})

async function getAll(req, res){
    try{
        const score = await Score.findAll({include: [{
            model: User,
            through: {attributes : []}
        }], order: ["User_Score", "DESC"]});

        res.status(200).json(score);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function getUserScores(req, res){
    try{
        const {userId} = req.params
        const scores = await Score.findAll({ where: { ID_User: userId }});

        res.status(200).json(scores);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function getUserDepartementScore(req, res){
    try{
        const {userToken, depName} = req.params
        const user = await User.findOne({where: {Token_User: userToken}});
        const department = await Department.findOne({where: {Name_Department: depName} });
        const score = await Score.findOne({ where: { ID_User: user.ID_User, ID_Department: department.ID_Department }});

        res.status(200).json(score);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};


async function createUserScore(req, res){
    try{
        const {userToken, depName, amount} = req.params
        const user = await User.findOne({where: {Token_User: userToken}});
        const department = await Department.findOne({where: {Name_Department: depName} });
        const score = await Score.create({  ID_User: user.ID_User, ID_Department: department.ID_Department, User_Score: amount });

        res.status(200).json(score);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};


async function patchUserDepartementScore(req, res){
    try{
        const {userId, departmentId, amount} = req.params
        const score = await Score.update({User_Score: amount}, { where: { ID_User: userId, ID_Department: departmentId } });

        res.status(200).json(score);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function deleteScore(req, res){
    try{
        const {ID_Department, ID_User, ID_Score} = req.query
        const where = { };

        if(ID_Department){
            where.ID_Department = ID_Department
        }
        if(ID_User){
            where.ID_User = ID_User
        }if(ID_Score){
            where.ID_Score = ID_Score
        }
        const score = await Score.destroy({ where });

        res.status(200).json(score);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};



module.exports = { getAll, getUserDepartementScore, getUserScores, createUserScore, patchUserDepartementScore, deleteScore }