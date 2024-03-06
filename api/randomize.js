const {Theme, Department} = require("./models/game/themeModel");

async function randomizeAllThemes(){
    const themes = await Theme.findAll();
    const departements = await Department.findAll();
    for (const department of departements){

            const dep = await Department.findOne({ 
                where: {Code_Department: department.Code_Department } 
            });
            
            await dep.setThemes([]); 
            await dep.addTheme(themes[Math.floor(Math.random() * themes.length)]);
        

    }
}

module.exports = randomizeAllThemes;