const defaultImage =
  "https://th.bing.com/th/id/OIP.Z8H1PuHgc9kOhorZshNCwAHaE8?rs=1&pid=ImgDetMain";

const cleanArray = (arr) =>
  arr.map((elem) => {
    imageSetter(elem);
    const fullName = `${elem.name.forename} ${elem.name.surname}`;
    const teamsArray = elem.teams
      ? elem.teams.split(",").map((team) => team.trim())
      : [];
    return {
      id: elem.id,
      fullName: fullName.toUpperCase(),
      name: elem.name.forename,
      surname: elem.name.surname,
      description: elem.description,
      image: elem.image.url,
      nationality: elem.nationality,
      birthDate: elem.dob,
      teams: teamsArray,
      created: false,
    };
  });

const cleanDbArray = (arr) =>
  arr.map((elem) => {
    imageSetter(elem);
    const fullName = `${elem.name} ${elem.surname}`;
    const teamsArray = elem.teams
      ? elem.teams.split(", ").map((team) => team.trim())
      : [];
    return {
      id: elem.id,
      fullName: fullName.toUpperCase(),
      name: elem.name,
      surname: elem.surname,
      description: elem.description,
      image: elem.image,
      nationality: elem.nationality,
      birthDate: elem.birthDate,
      teams: teamsArray,
      created: elem.created,
    };
  });

const capitalizeFirstLetter = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const imageSetter = (driver) => {
  if (!driver.image.url) {
    driver.image.url = defaultImage;
  }
};

const teamsToString = (teams) => {
  if (Array.isArray(teams)) {
    teams = teams.join(", ");
  }
  return teams;
};

module.exports = {
  cleanArray,
  cleanDbArray,
  capitalizeFirstLetter,
  imageSetter,
  teamsToString,
};
