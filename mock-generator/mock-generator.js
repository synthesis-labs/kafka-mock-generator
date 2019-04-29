var producer = require("./producer");

const config = {
  bootstrapServers: process.env.bootstrap_servers || "localhost:9092",
  schemaRegistryUrl: process.env.schema_registry_url || "http://localhost:8081"
};

console.log(`config: ${JSON.stringify(config)}`);

class MockGenerator {
  constructor(options) {
    this.options = options;
  }

  start() {
    producer
      .init(config.bootstrapServers, config.schemaRegistryUrl)
      .then(() => {
        var iterate = i => {
          var key = { id: i };
          var value = this.options.valueSchema();

          producer.produce(this.options.topicName, key, value);

          if (i < this.options.iterations) {
            var min = 100;
            var max = this.options.maxInterval;
            var randomInterval =
              Math.floor(Math.random() * (+max - +min)) + +min;

            setTimeout(iterate, randomInterval, ++i);
          }
        };

        iterate(1);
      });

    console.log(`Started ${this.options.topicName} generator... sweet!`);
  }
}

function create(options) {
  return new MockGenerator(options);
}

module.exports.create = create;
