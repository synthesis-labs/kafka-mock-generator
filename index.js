var mockGenerator = require("./mock-generator/mock-generator");

// Mock user generator
//
var mockUserGenerator = mockGenerator.create({
  maxInterval: 5000,
  iterations: 10,
  topicName: "mock-users",
  valueSchema: require("./schemas-json/user")
});

mockUserGenerator.start();


// Mock activity generator
//
var mockActivityGenerator = mockGenerator.create({
  maxInterval: 1000,
  iterations: 1000,
  topicName: "mock-activity",
  valueSchema: require("./schemas-json/activity")
});

mockActivityGenerator.start()