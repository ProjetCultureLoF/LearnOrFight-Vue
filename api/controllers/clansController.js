const { Clan } = require('../models/client/clanModel');


async function getById(req, res){
    try{
        const { id } = req.params;
        const clan = await Clan.findOne({ where: {ID_Clan: id} });

        res.status(200).json(clan);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function getAll(req, res){
    try{
        const { ID_Clan, Title_Clan } = req.query;
        const where = { };
        if(ID_Clan){
            where.ID_Clan = ID_Clan
        }
        if(Title_Clan){
            where.Title_Clan = Title_Clan
        }
        const clans = await Clan.findAll({ where });

        res.status(200).json(clans);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function createClan(req, res){
    try{
        const { title } = req.params;

        const clan = await Clan.create({ 
            Title_Clan: title
        });

        res.status(200).json(clan);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function patchClan(req, res){
    try{
        const { Title_Clan } = req.query;
        const criteria = { };
        const { id } = req.params
        if(Title_Clan){
            criteria.Title_Clan = Title_Clan
        }
        const clan = await Clan.update({ criteria, where: { ID_Clan: id } });

        res.status(200).json(clan);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function deleteClan(req, res){
    try{
        const { id } = req.params;
        const clan = await Clan.destroy({ where: {ID_Clan: id} });

        res.status(200).json(clan);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

async function deleteClanQuery(req, res){
    try{
        const { ID_Clan, Title_Clan } = req.query;
        const where = { };
        if(ID_Clan){
            where.ID_Clan = ID_Clan
        }
        if(Title_Clan){
            where.Title_Clan = Title_Clan
        }
        const Clan = await Clan.destroy({ where });

        res.status(200).json(Clan);
    }catch(error){
        console.log(error);
        res.status(400).json(error);
    }
};

module.exports = { getById, getAll, createClan, patchClan, deleteClanQuery, deleteClan };