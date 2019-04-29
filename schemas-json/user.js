const faker = require("faker");

module.exports = () => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    gender: faker.random.arrayElement(["MALE", "FEMALE", "OTHER"])
  };
};
