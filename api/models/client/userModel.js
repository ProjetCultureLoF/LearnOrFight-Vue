const { db } = require("../db");
const Sequelize = require("sequelize");
const { Clan } = require("./clanModel");

const User = db.define("user", {
  ID_User: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name_User: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      is: {
        args: /^[a-zA-Z0-9_-]{3,16}$/,
        msg: "Le nom d'utilisateur doit contenir entre 3 et 16 caractères alphanumériques, tiret bas ou tiret.",
      },
    },
  },
  Mail_User: {
    type: Sequelize.STRING,
    unique: true,
  },
  Password_User: {
    type: Sequelize.STRING,
    /*validate: {
            is: {
                args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                msg: "Le mot de passe doit contenir au moins une majuscule un chiffre, une lettre et un caractère alpha-numérique et être plus long que 8 caractères"
            }
        }*/
  },
  Token_User: {
    type: Sequelize.STRING,
    unique: true,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
  },
});

User.belongsTo(Clan);
Clan.hasMany(User);

module.exports = { db, User, Clan };
