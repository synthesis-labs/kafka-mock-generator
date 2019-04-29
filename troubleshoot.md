librdkafka issues, maybe this: https://github.com/Blizzard/node-rdkafka/blob/master/examples/docker-alpine.md

Option 1:

```sh
$ sudo apt install librdkafka-dev
```

Option 2:

```sh
$ LD_LIBRARY_PATH=~/git/kafka-mock-producer/node_modules/node-rdkafka/build/deps node index.js
```