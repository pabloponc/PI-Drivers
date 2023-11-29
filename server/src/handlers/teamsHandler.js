const { getAllTeams } = require("../controllers/teamsController");

// This handler gets all teams
const getTeamsHandler = async (req, res) => {
  try {
    const teams = await getAllTeams();
    res.status(200).json(teams.sort());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTeamsHandler,
};
