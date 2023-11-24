const {
  getDriverById,
  createDriver,
  getAllDrivers,
  searchByName,
} = require("../controllers/driversController");

//This handler gets all drivers or a driver by name
const getDriversHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const results = name ? await searchByName(name) : await getAllDrivers();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//This handler gets a driver by id
const getDriverByIdHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";

  try {
    const driver = await getDriverById(id, source);
    res.status(200).json(driver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//This handler create a new driver
const createDriverHandler = async (req, res) => {
  const { name, surname, description, image, nationality, birthDate } =
    req.body;
  try {
    const newDriver = await createDriver(
      name,
      surname,
      description,
      image,
      nationality,
      birthDate
    );
    res
      .status(201)
      .json({ message: "Driver created successfully", driver: newDriver });
  } catch (error) {
    res.status(400).json({ error: message });
  }
};

module.exports = {
  getDriversHandler,
  getDriverByIdHandler,
  createDriverHandler,
};
