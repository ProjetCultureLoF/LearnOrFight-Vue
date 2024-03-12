const { db } = require("../db");
const Sequelize = require("sequelize");
const { User } = require("./userModel");
const { Department } = require("./departmentModel");

const Score = db.define("score", {
  ID_Score: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  User_Score: {
    type: Sequelize.INTEGER,
  },
});

User.belongsToMany(Department, { through: Score });
Department.belongsToMany(User, { through: Score });

User.hasMany(Score);
Score.belongsTo(User);

module.exports = { db, Score, User, Department };
