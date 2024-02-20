const { db } = require("../db")
const Sequelize = require('sequelize');
const { Answer } = require('./answerModel');
const { Quiz } = require('./quizModel');

const QuizAnswer = db.define("quizAnswer", {
    ID_QuizAnswer: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Is_QuizAnswer: {
        type: Sequelize.BOOLEAN,
        default: false
    }
});

Quiz.belongsToMany(Answer, {through: QuizAnswer});
Answer.belongsToMany(Quiz, {through: QuizAnswer});

Quiz.hasMany(QuizAnswer);
QuizAnswer.belongsTo(Quiz);
Answer.hasMany(QuizAnswer);
QuizAnswer.belongsTo(Answer);

module.exports = {db, QuizAnswer, Quiz, Answer};
