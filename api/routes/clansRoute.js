const express = require("express");

const clansRouter = express.Router();
const controller = require("../controllers/clansController");

clansRouter.post("/:title", controller.createClan);

clansRouter.get("/", controller.getAll);
clansRouter.get("/byId/:id", controller.getById);
clansRouter.get("/scores", controller.getClansScores);

clansRouter.patch("/:id", controller.patchClan);

clansRouter.delete("/byId/:id", controller.deleteClan);
clansRouter.delete("/query", controller.deleteClanQuery);

module.exports = clansRouter;
