# Simple random kafka generator

1. `npm install`
2. Add schema using [faker](https://github.com/Marak/faker.js)

```js
const faker = require("faker");

module.exports = () => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email()
  };
};

```

3. Create generators!

```js
var mockGenerator = require("./mock-generator");

var mockUserGenerator = mockGenerator.create({
  maxInterval: 5000,
  iterations: 10,
  format: "JSON", // TODO
  topicName: "mock-users",
  partitions: 12, // TODO
  replication: 1, // TODO
  keySchema: "MockUserKey", // TODO
  valueSchema: require("./schemas/user")
});

mockUserGenerator.start();
```