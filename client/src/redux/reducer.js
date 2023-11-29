import {
  GET_DRIVER,
  SET_ALL_DRIVERS,
  SET_ALL_TEAMS,
  SET_FILTER_BY_TEAM,
  SET_FILTER_BY_ORIGIN,
  RESET_FILTERS,
} from "./action-types";

const initialState = {
  allDrivers: [],
  driverDetail: {},
  allTeams: [],
  filteredDrivers: [],
  filterByTeam: "",
  filterByOrigin: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_DRIVERS:
      return { ...state, allDrivers: action.payload };

    case GET_DRIVER:
      return { ...state, driverDetail: action.payload };

    case SET_ALL_TEAMS:
      return { ...state, allTeams: action.payload };

    case SET_FILTER_BY_TEAM:
      const filterValueByTeam = action.payload;
      let filteredByTeam;
      console.log(filterValueByTeam);

      if (state.filteredDrivers.length === 0) {
        filteredByTeam = state.allDrivers.filter((driver) => {
          const teamFilterPass =
            !filterValueByTeam ||
            driver.teams?.some(
              (team) => team.toUpperCase() === filterValueByTeam
            );
          const originFilterPass =
            !state.filterByOrigin ||
            driver.created.toString() === state.filterByOrigin;
          return teamFilterPass && originFilterPass;
        });
      } else {
        filteredByTeam = state.filteredDrivers.filter((driver) => {
          const teamFilterPass =
            !filterValueByTeam ||
            driver.teams?.some(
              (team) => team.toUpperCase() === filterValueByTeam
            );
          const originFilterPass =
            !state.filterByOrigin ||
            driver.created.toString() === state.filterByOrigin;
          return teamFilterPass && originFilterPass;
        });
      }

      return {
        ...state,
        filteredDrivers: filteredByTeam,
        filterByTeam: filterValueByTeam,
      };

    case SET_FILTER_BY_ORIGIN:
      const filterValueByOrigin = action.payload;
      let filteredByOrigin;
      if (state.filteredDrivers.length === 0) {
        filteredByOrigin = state.allDrivers.filter((driver) => {
          const teamFilterPass =
            !state.filterByTeam ||
            driver.teams?.some(
              (team) => team.toUpperCase() === filterValueByTeam
            );
          const originFilterPass =
            !filterValueByOrigin ||
            driver.created?.toString() === filterValueByOrigin.toString();
          return teamFilterPass && originFilterPass;
        });
      } else {
        filteredByOrigin = state.filteredDrivers.filter((driver) => {
          const teamFilterPass =
            !state.filterByTeam ||
            driver.teams?.some(
              (team) => team.toUpperCase() === filterValueByTeam
            );
          const originFilterPass =
            !filterValueByOrigin ||
            driver.created?.toString() === filterValueByOrigin.toString();
          return teamFilterPass && originFilterPass;
        });
      }

      return {
        ...state,
        filteredDrivers: filteredByOrigin,
        filterByOrigin: filterValueByOrigin,
      };

    case RESET_FILTERS:
      return {
        ...state,
        filteredDrivers: state.allDrivers,
        filterByTeam: "",
        filterByOrigin: "",
      };

    default:
      return state;
  }
};

export default rootReducer;
