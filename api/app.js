const express = require("express");
const cors = require("cors");

const app = express();

const { db } = require("./models/db");
const usersRoute = require("./routes/usersRoute");
const departmentsRoute = require("./routes/departementsRoute");
const scoresRoute = require("./routes/scoresRoute");
const clansRoute = require("./routes/clansRoute");
const themesRoute = require("./routes/themesRoute");
const quizRoute = require("./routes/quizRoute");
const answerRoute = require("./routes/answerRoute");
const quizAnswersRoute = require("./routes/quizAnswersRoute");
const themeQuizRoute = require("./routes/themeQuizRoute");
const departmentQuizzesRoute = require("./routes/departmentQuizzesRoute");
const userAnswersRoute = require("./routes/userAnswersRoute");

const randomize = require("./randomize");

const port = 3001;
const corsOptions = {
  origin: function (origin, callback) {
    if (origin || !origin) {
      // if (!origin || origin === "http://localhost:5173") {
      console.log("Origine du type ?????: ", origin);
      callback(null, true);
    } else {
      console.log("Origine du type ?????: ", origin);

      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/v1/users", usersRoute);
app.use("/api/v1/departments", departmentsRoute);
app.use("/api/v1/scores", scoresRoute);
app.use("/api/v1/clans", clansRoute);
app.use("/api/v1/themes", themesRoute);
app.use("/api/v1/quiz", quizRoute);
app.use("/api/v1/answers", answerRoute);
app.use("/api/v1/quizAnswers", quizAnswersRoute);
app.use("/api/v1/themeQuiz", themeQuizRoute);
app.use("/api/v1/departmentQuizzes", departmentQuizzesRoute);
app.use("/api/v1/userAnswers", userAnswersRoute);

//randomize.createTheme();

//randomize.putDepartment();

//randomize.randomizeAllThemes();

//randomize.randomizeDepartmentQuiz();

db.sync({ force: false })
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Le serveur est bien lancé sur http://0.0.0.0:${port}`);
    });
  })
  .catch((error) => {
    console.error(
      "Erreur lors de la synchronisation de la base de données:",
      error
    );
  });
