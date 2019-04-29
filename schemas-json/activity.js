const faker = require("faker");

module.exports = () => {
  return {
    userid: faker.random.number({ min: 1, max: 10 }),
    activity: faker.random.arrayElement(["LOGIN", "CHECKOUT", "PAY"])
  };
};
