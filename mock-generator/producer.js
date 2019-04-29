var KafkaAvro = require("kafka-avro");

var kafkaAvro;

function produce(topic, key, value) {
  kafkaAvro.getProducer({}).then(function(producer) {
    producer.on("disconnected", function(arg) {
      console.log("producer disconnected. " + JSON.stringify(arg));
    });

    console.log(`${topic}: ${JSON.stringify(value, 0 , 2)}`);
    producer.produce(topic, -1, value, key);
  });
}

function init(bootstrapServers, schemaRegistryUrl) {
  kafkaAvro = new KafkaAvro({
    kafkaBroker: bootstrapServers,
    schemaRegistry: schemaRegistryUrl
  });
  return kafkaAvro.init();
}

module.exports.init = init;
module.exports.produce = produce;
