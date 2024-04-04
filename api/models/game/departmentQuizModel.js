const { db } = require("../db");
const Sequelize = require("sequelize");
const { Department } = require("../client/departmentModel");
const { Quiz } = require("./quizModel");

const DepartmentQuiz = db.define("departmentQuiz", {
  ID_DepartmentQuiz: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

Quiz.belongsToMany(DepartmentQuiz, { through: DepartmentQuiz });
Department.belongsToMany(Quiz, { through: DepartmentQuiz });

Quiz.hasMany(DepartmentQuiz);
DepartmentQuiz.belongsTo(Quiz);
Department.hasMany(DepartmentQuiz);
DepartmentQuiz.belongsTo(Department);

module.exports = { db, DepartmentQuiz };
