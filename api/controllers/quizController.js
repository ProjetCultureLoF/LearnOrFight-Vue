const { Quiz, Answer, QuizAnswer } = require("../models/game/quizAnswerModel");
const { Theme, ThemeQuiz } = require("../models/game/themeQuizModel");
const { Department } = require("../models/client/departmentModel");

async function getAll(req, res) {
  try {
    const { ID_Quiz, Question_Quiz, Used_ThemeQuiz, ID_ThemeQuiz } = req.query;
    const where = {};

    if (ID_Quiz) {
      where.ID_Quiz = ID_Quiz;
    }
    if (Question_Quiz) {
      where.Question_Quiz = Question_Quiz;
    }
    if (Used_ThemeQuiz) {
      where["$themes->themeQuiz.Used_ThemeQuiz$"] = Used_ThemeQuiz;
    }

    if (ID_ThemeQuiz) {
      where["$themes->themeQuiz.ID_ThemeQuiz$"] = ID_ThemeQuiz;
    }

    const quizs = await Quiz.findAll({
      where,
      include: [
        {
          model: Answer,
          include: [
            {
              model: QuizAnswer,
            },
          ],
        },
        {
          model: Theme,
        },
        {
          model: ThemeQuiz,
          attributes: ["Used_ThemeQuiz", "ID_ThemeQuiz"],
        },
      ],
    });

    res.status(200).json(quizs);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;

    const quizs = await Quiz.findByPk(id, {
      include: [
        {
          model: Answer,
          include: [
            {
              model: QuizAnswer,
            },
          ],
        },
        {
          model: Theme,
        },
        {
          model: ThemeQuiz,
          attributes: ["Used_ThemeQuiz", "ID_ThemeQuiz"],
        },
      ],
    });

    res.status(200).json(quizs);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function getQuizesByDepartmentName(req, res) {
  try {
    const { depName } = req.params;
    const department = await Department.findOne({
      where: { Name_Department: depName },
      include: [
        {
          model: Theme,
          include: [
            {
              model: Quiz,
              through: {
                model: ThemeQuiz,
                where: { Used_ThemeQuiz: true },
                required: true,
              },
              include: [
                {
                  model: Answer,
                  through: { attributes: [] },
                },
                {
                  model: Theme,
                  through: { attributes: [] },
                },
              ],
            },
          ],
        },
      ],
    });

    const quizes = department.themes.flatMap((theme) => theme.quizzes);
    res.status(200).json(quizes);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
}

async function createQuiz(req, res) {
  try {
    const { question } = req.params;

    const quiz = await Quiz.create({
      Question_Quiz: question,
    });

    res.status(200).json(quiz);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function patchQuiz(req, res) {
  try {
    const { Question_Quiz } = req.query;
    const criteria = {};
    const { id } = req.params;
    if (Question_Quiz) {
      criteria.Question_Quiz = decodeURIComponent(Question_Quiz);
    }
    const quiz = await Quiz.update(criteria, { where: { ID_Quiz: id } });

    res.status(200).json(quiz);
    console.log("Question: ", Question_Quiz);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function deleteQuiz(req, res) {
  try {
    const { id } = req.params;
    const quiz = await Quiz.destroy({ where: { ID_Quiz: id } });

    res.status(200).json(quiz);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function deleteQuizQuery(req, res) {
  try {
    const { ID_Quiz, Question_Quiz } = req.query;
    const where = {};
    if (ID_Quiz) {
      where.ID_Quiz = ID_Quiz;
    }
    if (Question_Quiz) {
      where.Question_Quiz = Question_Quiz;
    }
    const Quiz = await Quiz.destroy({ where });

    res.status(200).json(Quiz);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

module.exports = {
  getAll,
  getById,
  createQuiz,
  patchQuiz,
  deleteQuizQuery,
  deleteQuiz,
  getQuizesByDepartmentName,
};
