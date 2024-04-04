const { DepartmentQuiz } = require("../models/game/departmentQuizModel");
const { Quiz } = require("../models/game/quizModel");
const { Answer } = require("../models/game/answerModel");
const { Theme, Department } = require("../models/game/themeModel");

async function addQuizDepartment(req, res) {
  try {
    const { ID_Quiz, ID_Department } = req.params;

    const departmentQuiz = await DepartmentQuiz.create({
      quizIDQuiz: ID_Quiz,
      departmentIDDepartment: ID_Department,
    });

    res.status(200).json(departmentQuiz);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function getAll(req, res) {
  try {
    const { ID_Quiz, ID_Department, Name_Department } = req.query;
    const where = {};
    if (ID_Quiz) {
      where.quizIDQuiz = ID_Answer;
    }
    if (ID_Department) {
      where.departmentIDDepartment = ID_Department;
    }
    if (Name_Department) {
      const department = await Department.findOne({
        where: { Name_Department },
      });
      where.departmentIDDepartment = department.ID_Department;
    }
    const departmentQuiz = await DepartmentQuiz.findAll({
      where,
      include: {
        model: Quiz,
        include: [{ model: Answer }, { model: Theme }],
      },
    });

    res.status(200).json(departmentQuiz);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function deleteQuiz(req, res) {
  try {
    const { id } = req.params;
    const departmentQuiz = await DepartmentQuiz.destroy({
      where: { ID_DepartmentQuiz: id },
    });

    res.status(200).json(departmentQuiz);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

module.exports = { getAll, addQuizDepartment, deleteQuiz };
