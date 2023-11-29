import axios from "axios";
import {
  GET_DRIVER,
  SET_ALL_DRIVERS,
  SET_ALL_TEAMS,
  SET_FILTER_BY_TEAM,
  SET_FILTER_BY_ORIGIN,
  RESET_FILTERS,
} from "./action-types";

// export const getDrivers = () => {
//   return async function (dispatch) {
//     try {
//       const drivers = (await axios.get("http://localhost:3001/drivers")).data;
//       dispatch({ type: GET_DRIVERS, payload: drivers });
//     } catch (error) {
//       throw new Error("Error al obtener los drivers");
//     }
//   };
// };
export const getAllDrivers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/drivers");
      const data = response.data;
      dispatch(setAllDrivers(data));
    } catch (error) {
      throw new Error("Error al obtener los drivers");
    }
  };
};

export const getDriver = (id) => {
  return async function (dispatch) {
    try {
      const driverDetail = (
        await axios.get(`http://localhost:3001/drivers/${id}`)
      ).data;
      dispatch({ type: GET_DRIVER, payload: driverDetail });
    } catch (error) {
      throw new Error("Error al obtener un driver por id");
    }
  };
};

// export const getTeams = () => {
//   return async function (dispatch) {
//     try {
//       const teams = (await axios.get("http://localhost:3001/teams")).data;
//       dispatch({ type: GET_TEAMS, payload: teams });
//     } catch (error) {
//       throw new Error("Error al obtener los teams");
//     }
//   };
// };
export const getAllTeams = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/teams");
      const data = response.data;
      dispatch(setAllTeams(data));
    } catch (error) {
      throw new Error("Error al obtener los equipos");
    }
  };
};

export const postDriver = (driver) => {
  const endpoint = "/drivers";
  return async () => {
    try {
      console.log(driver);
      const { data } = await axios.post(endpoint, driver);

      if (!data.length) throw Error("No se ha podido crear el driver");
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const setAllDrivers = (drivers) => {
  return {
    type: SET_ALL_DRIVERS,
    payload: drivers,
  };
};

export const setAllTeams = (teams) => {
  return {
    type: SET_ALL_TEAMS,
    payload: teams,
  };
};

export const setFilterByTeam = (filterValue) => {
  return {
    type: SET_FILTER_BY_TEAM,
    payload: filterValue,
  };
};

export const setFilterByOrigin = (filterValue) => {
  return {
    type: SET_FILTER_BY_ORIGIN,
    payload: filterValue,
  };
};

export const resetFilters = () => {
  return {
    type: RESET_FILTERS,
  };
};
