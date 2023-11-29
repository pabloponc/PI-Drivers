const axios = require("axios");
const { Team } = require("../db");
//This controller create the teams
const createTeam = async (name) => await Team.create({ name });

//This controller gets all teams
const getAllTeams = async () => {
  const teamsInDatabase = await Team.findAll();
  const uniqueTeams = new Set();

  if (teamsInDatabase.length === 0) {
    response = (await axios.get(`http://localhost:3001/drivers`)).data;
    response.forEach((driver) => {
      if (driver.teams) {
        // const driverTeams = driver.teams
        //   .split(",")
        //   .map((team) => team.trim().toUpperCase());
        driver.teams.forEach((team) => {
          const formattedTeam = team.trim().toUpperCase();
          uniqueTeams.add(formattedTeam);
        });
      }
    });
    for (let teamName of uniqueTeams) {
      await createTeam(teamName);
    }

    return Array.from(uniqueTeams);
  }
  return teamsInDatabase.sort();
};

module.exports = { getAllTeams };
