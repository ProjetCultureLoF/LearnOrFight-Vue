const { User } = require('../models/client/userModel');


async function getByToken(req, res){
    try{
        const { token } = req.params;
        const user = await User.findOne({ where: {Token_User: token} });

        res.status(200).json(user);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function getAll(req, res){
    try{
        const { ID_User, Name_User, Mail_User, Password_User, Token_User, ID_Clan } = req.query;
        const where = { };
        if(ID_User){
            where.ID_User = ID_User
        }
        if(Name_User){
            where.Name_User = Name_User
        }
        if(Mail_User){
            where.Mail_User = Mail_User
        }
        if(Password_User){
            where.Password_User = Password_User
        }
        if(Token_User){
            where.Token_User = Token_User
        }
        if(ID_Clan){
            where.ID_Clan = ID_Clan
        }
        const users = await User.findAll({ where });

        res.status(200).json(users);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function createUser(req, res){
    try{
        const { name, mail, password, token, clanId } = req.params;

        const user = await User.create({ Name_User: name, Mail_User: mail, Password_User: password, Token_User: token, ID_Clan: clanId });

        res.status(200).json(user);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function patchUser(req, res){
    try{
        const { id } = req.params;

        const { Name_User, Mail_User, Password_User, Token_User, ID_Clan } = req.query;
        const criteria = { };

        if(Name_User){
            criteria.Name_User = Name_User
        }
        if(Mail_User){
            criteria.Mail_User = Mail_User
        }
        if(Password_User){
            criteria.Password_User = Password_User
        }
        if(Token_User){
            criteria.Token_User = Token_User
        }
        if(ID_Clan){
            criteria.ID_Clan = ID_Clan
        }

        const user = await User.update(criteria, { where: {ID_User: id} });

        res.status(200).json(user);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function deleteUser(req, res){
    try{
        const { ID_User, Name_User, Mail_User, Password_User, Token_User, ID_Clan } = req.query;
        const criteria = { };
        if(ID_User){
            criteria.ID_User = ID_User
        }
        if(Name_User){
            criteria.Name_User = Name_User
        }
        if(Mail_User){
            criteria.Mail_User = Mail_User
        }
        if(Password_User){
            criteria.Password_User = Password_User
        }
        if(Token_User){
            criteria.Token_User = Token_User
        }
        if(ID_Clan){
            criteria.ID_Clan = ID_Clan
        }
        const user = await User.destroy({where});

        res.status(200).json(user);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

module.exports = { getByToken, getAll, createUser, patchUser, deleteUser };