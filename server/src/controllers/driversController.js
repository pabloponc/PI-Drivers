const axios = require("axios");
const { Driver } = require("../db");
const {
  cleanArray,
  cleanDbArray,
  capitalizeFirstLetter,
  imageSetter,
  teamsToString,
} = require("./helpers");
const defaultImage =
  "https://th.bing.com/th/id/OIP.Z8H1PuHgc9kOhorZshNCwAHaE8?rs=1&pid=ImgDetMain";

// This controler gets all drivers
const getAllDrivers = async () => {
  const dbDriversRaw = await Driver.findAll();

  const dbDrivers = cleanDbArray(dbDriversRaw);

  const apiDriversRaw = (await axios.get(`http://localhost:5000/drivers`)).data;

  const apiDrivers = cleanArray(apiDriversRaw);

  return [...dbDrivers, ...apiDrivers];
};

// This controller search by name
const searchByName = async (name) => {
  const newName = capitalizeFirstLetter(name);
  const dbDriver = await Driver.findAll({ where: { name: newName } });

  const apiDriversRaw = (await axios.get(`http://localhost:5000/drivers`)).data;

  const apiDrivers = cleanArray(apiDriversRaw);

  const filteredApi = apiDrivers.filter((driver) => driver.name === newName);

  const allDrivers = [...filteredApi, ...dbDriver];

  return allDrivers;
};

//This controler gets a driver by id
const getDriverById = async (id, source) => {
  const driver =
    source === "api"
      ? (await axios.get(`http://localhost:3001/drivers`)).data.find(
          (driver) => driver.id.toString() === id.toString()
        )
      : await Driver.findByPk(id);

  imageSetter(driver);
  let teams = driver.teams;
  if (Array.isArray(teams)) {
    teams = teams.join(", ");
  }
  const cutDriver = {
    id: driver.id,
    name: driver.name,
    surname: driver.surname,
    description: driver.description,
    image: driver.image,
    nationality: driver.nationality,
    birthDate: driver.birthDate,
    teams: teams,
  };

  return cutDriver;
};

//This controller create a new driver
const createDriver = async (
  name,
  surname,
  description,
  image,
  nationality,
  birthDate,
  teams
) => {
  if (!image) image = defaultImage;
  teams = teamsToString(teams);

  await Driver.create({
    name,
    surname,
    description,
    image,
    nationality,
    birthDate,
    teams,
  });
};

module.exports = { getDriverById, createDriver, getAllDrivers, searchByName };
