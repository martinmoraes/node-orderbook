const { DB } = require('../../src/repositories/DB');
require('dotenv/config');

describe('dbConneciton', () => {
  let db;
  beforeEach(() => {
    db = new DB();
  });
  it('should connect to MongoDB', async () => {
    const clientDB = await db.dbConnection();
    console.log(clientDB);
    expect(clientDB.s.url).toEqual(process.env.DB_CONN_STRING);
    clientDB.close();
  });
});
