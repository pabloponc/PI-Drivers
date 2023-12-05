export const validUrl = (url) => {
  try {
    new URL(url); // Si la URL ingresada no es valida esta linea lanza un error
    return true; // Si la url es valida retorna true
  } catch (error) {
    return false; // Si lanza un error simplemente retorna false
  }
};

export const toFullName = (name, surname) => {
  return `${name} ${surname}`;
};

export const toArray = (teams) => {
  return teams.join(", ");
};
