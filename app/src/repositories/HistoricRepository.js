const { DB } = require('./DB');
require('dotenv/config');

class HistoricRepository extends DB {
  constructor(DBConnection) {
    super();
    this.connection = DBConnection;
    this.collectionName = 'historic';
  }

  async create(order) {
    const result = await this.connection
      .db(process.env.DATABASE)
      .collection(this.collectionName)
      .insertOne(order);
    return result;
  }

  closeDB() {
    this.connection.close();
  }
}

module.exports = { HistoricRepository };
