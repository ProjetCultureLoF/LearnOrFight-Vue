const { UserAnswer } = require("../models/game/userAnswerModel");
const { User } = require("../models/client/userModel");
const { Quiz } = require("../models/game/quizModel");

async function addUserAnswer(req, res) {
  try {
    const { token, quizId, answer } = req.params;

    const user = await User.findOne({
      where: {
        Token_User: token,
      },
    });

    const userAnswer = await UserAnswer.create({
      userIDUser: user.ID_User,
      quizIDQuiz: quizId,
      Answer_UserAnswer: answer,
    });

    res.status(200).json(userAnswer);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function getAll(req, res) {
  try {
    const { Answer, ID_User, Token_User, ID_Quiz } = req.query;
    const where = {};
    if (Answer) {
      where.Answer_UserAnswer = Answer;
    }
    if (ID_User) {
      where.userIDUser = ID_User;
    }
    if (Token_User) {
      const user = await User.findOne({
        where: { Token_User },
      });
      where.userIDUser = user.ID_User;
    }
    if (ID_Quiz) {
      where.quizIDQuiz = ID_Quiz;
    }
    const userAnswer = await UserAnswer.findAll({
      where,
    });

    res.status(200).json(userAnswer);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function deleteUserAnswer(req, res) {
  try {
    const where = {};
    const { ID_UserAnswer, ID_User, ID_Quiz } = req.query;
    if (ID_UserAnswer) {
      where.ID_UserAnswer = ID_UserAnswer;
    }
    if (ID_User) {
      where.userIDUser = ID_User;
    }
    if (ID_Quiz) {
      where.quizIDQuiz = ID_Quiz;
    }
    const userAnswer = await UserAnswer.destroy({
      where,
    });

    res.status(200).json(userAnswer);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

module.exports = { getAll, addUserAnswer, deleteUserAnswer };
