const axios = require("axios");
const { Team } = require("../db");
//This controller create the teams
const createTeam = async (name) => await Team.create({ name });

//This controller gets all teams
const getAllTeams = async () => {
  const teamsInDatabase = await Team.findAll();
  const uniqueTeams = new Set();

  if (teamsInDatabase.length === 0) {
    response = (await axios.get(`http://localhost:5000/drivers`)).data;
    console.log(response);
    response.forEach((driver) => {
      if (driver.teams) {
        const driverTeams = driver.teams.split(",").map((team) => team.trim());
        driverTeams.forEach((team) => {
          uniqueTeams.add(team);
        });
      }
    });
    for (let teamName of uniqueTeams) {
      await createTeam(teamName);
    }

    return Array.from(uniqueTeams);
  }
  return teamsInDatabase;
};

module.exports = { getAllTeams };
