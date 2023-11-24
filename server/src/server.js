const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const axios = require("axios");

// URL local API
const apiUrl = "http://localhost:3001/api/db.json";

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use(router);

module.exports = server;
