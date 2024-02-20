const { db } = require("../db")
const Sequelize = require('sequelize');
const { Quiz } = require('./quizModel');
const { Theme } = require('./themeModel');

const ThemeQuiz = db.define("themeQuiz", {
    ID_ThemeQuiz: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Used_ThemeQuiz: {
        type: Sequelize.BOOLEAN,
        default: false
    }
});

Theme.belongsToMany(Quiz, {through: ThemeQuiz});
Quiz.belongsToMany(Theme, {through: ThemeQuiz});

Quiz.hasMany(ThemeQuiz);
ThemeQuiz.belongsTo(Quiz);
Theme.hasMany(ThemeQuiz);
ThemeQuiz.belongsTo(Theme);

module.exports = {db, ThemeQuiz, Theme, Quiz};
