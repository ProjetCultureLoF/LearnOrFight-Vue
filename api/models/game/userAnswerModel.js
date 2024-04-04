const { db } = require("../db");
const Sequelize = require("sequelize");

const { Quiz } = require("./quizModel");
const { User } = require("../client/userModel");

const UserAnswer = db.define("userAnswer", {
  ID_UserAnswer: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Answer_UserAnswer: {
    type: Sequelize.BOOLEAN,
  },
});

User.belongsToMany(Quiz, { through: UserAnswer });
Quiz.belongsToMany(User, { through: UserAnswer });

User.hasMany(UserAnswer);
UserAnswer.belongsTo(User);
Quiz.hasMany(UserAnswer);
UserAnswer.belongsTo(Quiz);

module.exports = { db, Quiz, User, UserAnswer };
