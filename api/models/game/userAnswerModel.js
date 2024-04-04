const { db } = require("../db");
const Sequelize = require("sequelize");

const { Answer } = require("./answerModel");
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

User.belongsToMany(Answer, { through: UserAnswer });
Answer.belongsToMany(User, { through: UserAnswer });

User.hasMany(UserAnswer);
UserAnswer.belongsTo(User);
Answer.hasMany(UserAnswer);
UserAnswer.belongsTo(Answer);

module.exports = { db, Answer, User, UserAnswer };
