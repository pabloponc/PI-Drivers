const { Router } = require("express");

const {
  getDriversHandler,
  getDriverByIdHandler,
  //   getDriverByNameHandler,
  createDriverHandler,
} = require("../handlers/driversHandler");
const driversRouter = Router();

const validate = (req, res, next) => {
  const { name, surname, nationality, birthDate } = req.body;
  if (!name) return res.status(400).json({ error: "Missing name" });
  if (!surname) return res.status(400).json({ error: "Missing surname" });
  if (!nationality)
    return res.status(400).json({ error: "Missing nationality" });
  if (!birthDate) return res.status(400).json({ error: "Missing birthDate" });
  next();
};

// Get all drivers
driversRouter.get("/", getDriversHandler);

//Get drivers by ID
driversRouter.get("/:id", getDriverByIdHandler);

//Create driver
driversRouter.post("/", validate, createDriverHandler);

module.exports = driversRouter;
