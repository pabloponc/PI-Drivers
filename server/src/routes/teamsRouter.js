const { Router } = require("express");

const { getTeamsHandler } = require("../handlers/teamsHandler");

const teamsRouter = Router();

// Get all teams
teamsRouter.get("/", getTeamsHandler);

module.exports = teamsRouter;
