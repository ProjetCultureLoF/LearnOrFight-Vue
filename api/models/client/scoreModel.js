const { db } = require("../db")
const Sequelize = require('sequelize');
const { User } = require('./userModel');
const { Department } = require('./departmentModel');

const Score = db.define("score", {
    ID_Score: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ID_User: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'ID_User'
        }
    },
    ID_Department: {
        type: Sequelize.INTEGER,
        references: {
            model: Department,
            key: 'ID_Department'
        }
    },
    User_Score: {
        type: Sequelize.INTEGER
    }
});

User.belongsToMany(Department, {through: Score, foreignKey: "ID_User"});
Department.belongsToMany(User, {through: Score, foreignKey: "ID_Department"});

module.exports = {db, Score, User, Department};