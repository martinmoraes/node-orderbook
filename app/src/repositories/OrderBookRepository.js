const { DB } = require('./DB');
require('dotenv/config');

const TYPE_BUY = 'buy';
const TYPE_SELL = 'sell';

class OrderBookRepository extends DB {
  constructor(DBConnection) {
    super();
    this.connection = DBConnection;
    this.collectionName = 'orderbook';
  }

  async create(order) {
    const result = await this.connection
      .db(process.env.DATABASE)
      .collection(this.collectionName)
      .insertOne(order);
    return result;
  }

  async updateById(_id, amount) {
    const result = await this.connection
      .db(process.env.DATABASE)
      .collection(this.collectionName)
      .updateOne({ _id }, { $set: { amount } });
    return result;
  }

  async findBuyInOrderBook(value = null) {
    const findCriteria = { type: TYPE_BUY };
    if (value) {
      findCriteria.value = { $gte: value };
    }
    return await this.connection
      .db(process.env.DATABASE)
      .collection(this.collectionName)
      .find(findCriteria)
      .sort({ value: -1, datatime: 1 })
      .toArray();
  }
  async findSellInOrderBook(value = null) {
    const findCriteria = { type: TYPE_SELL };
    if (value) {
      findCriteria.value = { $lte: value };
    }
    return await this.connection
      .db(process.env.DATABASE)
      .collection(this.collectionName)
      .find(findCriteria)
      .sort({ value: 1, datatime: 1 })
      .toArray();
  }

  async deleteById(_id) {
    return await this.connection
      .db(process.env.DATABASE)
      .collection(this.collectionName)
      .deleteOne({ _id });
  }

  closeDB() {
    this.connection.close();
  }
}

module.exports = { OrderBookRepository };
