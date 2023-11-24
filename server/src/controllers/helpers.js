const defaultImage =
  "https://th.bing.com/th/id/OIP.Z8H1PuHgc9kOhorZshNCwAHaE8?rs=1&pid=ImgDetMain";

const cleanArray = (arr) =>
  arr.map((elem) => {
    imageSetter(elem);
    return {
      id: elem.id,
      name: elem.name.forename,
      surname: elem.name.surname,
      description: elem.description,
      image: elem.image.url,
      nationality: elem.nationality,
      birthDate: elem.dob,
      created: false,
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

module.exports = {
  cleanArray,
  capitalizeFirstLetter,
  imageSetter,
};
