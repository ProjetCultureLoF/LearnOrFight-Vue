const { Score, User, Department } = require("../models/client/scoreModel");
const Sequelize = require("sequelize");

async function getAll(req, res) {
  try {
    let {
      departmentIDDepartment,
      userIDUser,
      ID_Score,
      clanIDClan,
      limit,
      offset,
      sort,
    } = req.query;
    const where = {};
    let max = 0;
    let min = 0;
    if (limit) {
      max = limit;
    } else {
      max = 10;
    }
    if (offset) {
      min = offset;
    } else {
      min = 0;
    }
    if (sort && (sort.toUpperCase() == "ASC" || sort.toUpperCase() == "DESC")) {
      sort = sort.toUpperCase();
    } else {
      sort = "ASC";
    }
    if (departmentIDDepartment) {
      where.departmentIDDepartment = departmentIDDepartment;
    }
    if (userIDUser) {
      where.userIDUser = userIDUser;
    }
    if (ID_Score) {
      where.ID_Score = ID_Score;
    }

    const scores = await Score.findAll({
      limit: max,
      offset: min,
      attributes: [
        "userIDUser",
        [Sequelize.fn("MAX", Sequelize.col("User_Score")), "maxScore"],
      ],
      group: ["userIDUser"],
      include: [
        {
          model: User,
          attributes: ["Name_User"],
          where: { clanIDClan },
          nest: true,
        },
        {
          model: Department,
          attributes: ["Name_Department"],
          nest: true,
        },
      ],
    });
    const modifiedScores = scores.map((score) => ({
      userIDUser: score.userIDUser,
      maxScore: score.dataValues.maxScore,
      Name_User: score.user.Name_User,
      Name_Department: score.department.Name_Department,
    }));

    res.status(200).json(modifiedScores);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function getUserScores(req, res) {
  try {
    const { userId } = req.params;
    const scores = await Score.findAll({
      where: { userIDUser: userId },
      include: [
        {
          model: User,
          attributes: ["Name_User"],
          nest: true,
        },
        {
          model: Department,
          nest: true,
          include: ["themes"],
        },
      ],
    });

    const modifiedScores = scores.map((score) => ({
      userIDUser: score.userIDUser,
      User_Score: score.dataValues.User_Score,
      Name_User: score.user.Name_User,
      Name_Department: score.department.Name_Department,
      Theme_Department: score.department.themes[0].Title_Theme,
    }));

    res.status(200).json(modifiedScores);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function getUserDepartementScore(req, res) {
  try {
    const { userToken, depName } = req.params;
    const user = await User.findOne({ where: { Token_User: userToken } });
    const department = await Department.findOne({
      where: { Name_Department: depName },
    });
    const score = await Score.findOne({
      where: {
        userIDUser: user.ID_User,
        departmentIDDepartment: department.ID_Department,
      },
    });

    res.status(200).json(score);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function createUserScore(req, res) {
  try {
    const { userToken, depName, amount } = req.params;
    const user = await User.findOne({ where: { Token_User: userToken } });
    const department = await Department.findOne({
      where: { Name_Department: depName },
    });
    const score = await Score.create({
      userIDUser: user.ID_User,
      departmentIDDepartment: department.ID_Department,
      User_Score: amount,
    });

    res.status(200).json(score);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function patchUserDepartementScore(req, res) {
  try {
    const { userId, departmentId, amount } = req.params;
    const score = await Score.update(
      { User_Score: amount },
      { where: { userIDUser: userId, departmentIDDepartment: departmentId } }
    );

    res.status(200).json(score);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function deleteScore(req, res) {
  try {
    const { departmentIDDepartment, userIDUser, ID_Score } = req.query;
    const where = {};

    if (departmentIDDepartment) {
      where.departmentIDDepartment = departmentIDDepartment;
    }
    if (userIDUser) {
      where.userIDUser = userIDUser;
    }
    if (ID_Score) {
      where.ID_Score = ID_Score;
    }
    const score = await Score.destroy({ where });

    res.status(200).json(score);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

module.exports = {
  getAll,
  getUserDepartementScore,
  getUserScores,
  createUserScore,
  patchUserDepartementScore,
  deleteScore,
};
