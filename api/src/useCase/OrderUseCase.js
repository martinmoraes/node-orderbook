const { Kafka, Partitioners } = require('kafkajs');
require('dotenv/config');

class OrderUseCase {
  async execute(order) {
    const message = this.organizeMessage(order);
    return await this.produce(message);
  }

  organizeMessage(order) {
    const key = '' + order.client;
    if (!Array.isArray(order)) {
      return [{ key, value: JSON.stringify(order) }];
    }
    return order.map(value => {
      return { key, value: JSON.stringify(value) };
    });
  }

  async produce(messages) {
    const clientId = process.env.CLIENT_ID_KAFKA;
    const brokers = process.env.BROKERS_IN_THE_CLUSTER.split(',');
    const topic = process.env.TOPIC_KAFKA;

    const kafka = new Kafka({ clientId, brokers });
    const producer = kafka.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
    });

    await producer.connect();

    let result;
    try {
      result = await producer.send({
        topic,
        messages,
      });
    } catch (error) {
      console.log('could not write message ' + error);
    }
    await producer.disconnect();
    return result;
  }
}
module.exports = { OrderUseCase };
