const axios = require("axios");
const glob = require("glob-promise");
const fs = require("fs");

/*
    Register any avsc files to schema registry

    topic: {
        topic: '<kafka topic name>',
        keySchema: '<avsc schema name>',
        valueSchema: '<avsc schema name>'
    }
*/

async function register(registryUrl = "http://localhost:8081", topic) {
  console.info(
    `Searching through all .avsc files for ${topic.keySchema} & ${
      topic.valueSchema
    }`
  );

  try {
    var files = await glob("**/*.avsc");

    for (let i = 0; i < files.length; i++) {
      var avscFile = JSON.parse(fs.readFileSync(files[i]));
      var keySchema = avscFile.find(s => {
        return s.name === topic.keySchema;
      });
      var valueSchema = avscFile.find(s => {
        return s.name === topic.valueSchema;
      });

      if (keySchema) {
        // Register the key
        //
        console.info(
          `Found key in ${files[i]}, registering ${keySchema.name} -> ${
            topic.topic
          }-key`
        );
        var response = await axios.post(
          `${registryUrl}/subjects/${topic.topic}-key/versions`,
          { schema: JSON.stringify(keySchema) }
        );
        console.info(`Registered key with ${JSON.stringify(response.data)}`);
      }

      if (valueSchema) {
        // Register the value
        //
        console.info(
          `Found value in ${files[i]}, registering ${valueSchema.name} -> ${topic.topic}-value`
        );
        response = await axios.post(
          `${registryUrl}/subjects/${topic.topic}-value/versions`,
          { schema: JSON.stringify(valueSchema) }
        );
        console.info(`Registered value with ${JSON.stringify(response.data)}`);
      }
    }
  } catch (error) {
    console.error(error);
    try {
      console.error(error.response.data.message);
    } catch (e) {} // No worries if no confluent error message

    throw error;
  }
}

module.exports.register = register;
