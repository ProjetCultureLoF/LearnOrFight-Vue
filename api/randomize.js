const { Theme, Department } = require("./models/game/themeModel");
const { DepartmentQuiz } = require("./models/game/departmentQuizModel");
const { UserAnswer } = require("./models/game/userAnswerModel");

const { Quiz } = require("./models/game/quizModel");
const { Score } = require("./models/client/scoreModel");

async function randomizeAllThemes() {
  const themes = await Theme.findAll();
  const departements = await Department.findAll();
  for (const department of departements) {
    const dep = await Department.findOne({
      where: { Code_Department: department.Code_Department },
    });

    await dep.setThemes([]);
    await dep.addTheme(themes[Math.floor(Math.random() * themes.length)]);
  }
}

async function createTheme() {
  const themes = [
    "Math",
    "Geographie",
    "Histoire",
    "Litterature",
    "Musique",
    "Cinema",
    "Sport",
    "Sciences",
    "Divertissement",
    "Films et series",
  ];
  for (const theme of themes) {
    await Theme.create({
      Title_Theme: theme,
    });
  }
}

async function putDepartment() {
  const department = [
    { name: "Ain", code: "01" },
    { name: "Aisne", code: "02" },
    { name: "Allier", code: "03" },
    { name: "Alpes-de-Haute-Provence", code: "04" },
    { name: "Hautes-Alpes", code: "05" },
    { name: "Alpes-Maritimes", code: "06" },
    { name: "Ardeche", code: "07" },
    { name: "Ardennes", code: "08" },
    { name: "Ariege", code: "09" },
    { name: "Aube", code: "10" },
    { name: "Aude", code: "11" },
    { name: "Aveyron", code: "12" },
    { name: "Bouches-du-Rhône", code: "13" },
    { name: "Calvados", code: "14" },
    { name: "Cantal", code: "15" },
    { name: "Charente", code: "16" },
    { name: "Charente-Maritime", code: "17" },
    { name: "Cher", code: "18" },
    { name: "Correze", code: "19" },
    { name: "Corse-du-Sud", code: "2A" },
    { name: "Haute-Corse", code: "2B" },
    { name: "Côte-d'Or", code: "21" },
    { name: "Côtes-d'Armor", code: "22" },
    { name: "Creuse", code: "23" },
    { name: "Dordogne", code: "24" },
    { name: "Doubs", code: "25" },
    { name: "Drôme", code: "26" },
    { name: "Eure", code: "27" },
    { name: "Eure-et-Loir", code: "28" },
    { name: "Finistere", code: "29" },
    { name: "Gard", code: "30" },
    { name: "Haute-Garonne", code: "31" },
    { name: "Gers", code: "32" },
    { name: "Gironde", code: "33" },
    { name: "Herault", code: "34" },
    { name: "Ille-et-Vilaine", code: "35" },
    { name: "Indre", code: "36" },
    { name: "Indre-et-Loire", code: "37" },
    { name: "Isere", code: "38" },
    { name: "Jura", code: "39" },
    { name: "Landes", code: "40" },
    { name: "Loir-et-Cher", code: "41" },
    { name: "Loire", code: "42" },
    { name: "Haute-Loire", code: "43" },
    { name: "Loire-Atlantique", code: "44" },
    { name: "Loiret", code: "45" },
    { name: "Lot", code: "46" },
    { name: "Lot-et-Garonne", code: "47" },
    { name: "Lozere", code: "48" },
    { name: "Maine-et-Loire", code: "49" },
    { name: "Manche", code: "50" },
    { name: "Marne", code: "51" },
    { name: "Haute-Marne", code: "52" },
    { name: "Mayenne", code: "53" },
    { name: "Meurthe-et-Moselle", code: "54" },
    { name: "Meuse", code: "55" },
    { name: "Morbihan", code: "56" },
    { name: "Moselle", code: "57" },
    { name: "Nievre", code: "58" },
    { name: "Nord", code: "59" },
    { name: "Oise", code: "60" },
    { name: "Orne", code: "61" },
    { name: "Pas-de-Calais", code: "62" },
    { name: "Puy-de-Dôme", code: "63" },
    { name: "Pyrenees-Atlantiques", code: "64" },
    { name: "Hautes-Pyrenees", code: "65" },
    { name: "Pyrenees-Orientales", code: "66" },
    { name: "Bas-Rhin", code: "67" },
    { name: "Haut-Rhin", code: "68" },
    { name: "Rhône", code: "69" },
    { name: "Haute-Saône", code: "70" },
    { name: "Saône-et-Loire", code: "71" },
    { name: "Sarthe", code: "72" },
    { name: "Savoie", code: "73" },
    { name: "Haute-Savoie", code: "74" },
    { name: "Paris", code: "75" },
    { name: "Seine-Maritime", code: "76" },
    { name: "Seine-et-Marne", code: "77" },
    { name: "Yvelines", code: "78" },
    { name: "Deux-Sevres", code: "79" },
    { name: "Somme", code: "80" },
    { name: "Tarn", code: "81" },
    { name: "Tarn-et-Garonne", code: "82" },
    { name: "Var", code: "83" },
    { name: "Vaucluse", code: "84" },
    { name: "Vendee", code: "85" },
    { name: "Vienne", code: "86" },
    { name: "Haute-Vienne", code: "87" },
    { name: "Vosges", code: "88" },
    { name: "Yonne", code: "89" },
    { name: "Territoire de Belfort", code: "90" },
    { name: "Essonne", code: "91" },
    { name: "Hauts-de-Seine", code: "92" },
    { name: "Seine-Saint-Denis", code: "93" },
    { name: "Val-de-Marne", code: "94" },
    { name: "Val-d'Oise", code: "95" },
  ];

  for (const dep of department) {
    await Department.create({
      Name_Department: dep.name,
      Code_Department: dep.code,
    });
  }
}

async function randomizeDepartmentQuiz() {
  await DepartmentQuiz.truncate();
  await UserAnswer.truncate();
  //await Score.truncate();
  const themes = await Theme.findAll();

  // console.log("Themes: ", JSON.stringify(themes));

  for (const theme of themes) {
    const Title_Theme = theme.Title_Theme;

    // console.log("Titre: ", Title_Theme);

    const departments = await Department.findAll({
      include: { model: Theme, where: { Title_Theme } },
    });

    if (Title_Theme == "Math") {
      for (const department of departments) {
        const quizzes = await Quiz.findAll({
          include: { model: Theme, where: { Title_Theme } },
        });

        for (let i = 0; i < 4; i++) {
          let j = Math.floor(Math.random() * quizzes.length);
          const departmentQuiz = await DepartmentQuiz.create({
            departmentIDDepartment: department.ID_Department,
            quizIDQuiz: quizzes[j].ID_Quiz,
          });

          quizzes[j].Used_Quiz = true;
          await departmentQuiz.save();
          await quizzes[j].save();
          quizzes.splice(j, 1);
          console.log(j);
        }
      }
    }
    // console.log("Departement: ", JSON.stringify(departments));
  }
}
async function deleteScores() {
  Score.truncate();
}

module.exports = {
  randomizeAllThemes,
  putDepartment,
  createTheme,
  randomizeDepartmentQuiz,
  deleteScores,
};
