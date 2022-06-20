const { Kafka, logLevel } = require('kafkajs');
require('dotenv/config');

class ConsumerService {
  async execute(executeCallBack) {
    const consumer = this.createConsumer();
    try {
      await this.eachMessage(consumer, executeCallBack);
    } catch (error) {
      console.error(`[example/consumer] ${error.message}`, error);
    }
  }

  createConsumer() {
    const host = process.env.BROKERS_IN_THE_CLUSTER;
    const kafka = new Kafka({
      logLevel: logLevel.INFO,
      brokers: [`${host}`],
      clientId: process.env.CLIENT_ID_KAFKA,
    });
    return kafka.consumer({ groupId: 'group' });
  }

  async eachMessage(consumer, executeCallBack) {
    const topic = process.env.TOPIC_KAFKA;
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const historic = {};
        historic.message = JSON.parse(message.value.toString());
        historic.key = message.key.toString();
        historic.topic = topic;
        historic.partition = partition;
        historic.offset = message.offset;
        let datatime = new Date(parseInt(message.timestamp));
        datatime = datatime.toISOString();
        historic.message.datatime = datatime;

        executeCallBack(historic);
      },
    });
  }
}

module.exports = { ConsumerService };
