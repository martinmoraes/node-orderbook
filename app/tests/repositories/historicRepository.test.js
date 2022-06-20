const {
  HistoricRepository,
} = require('../../src/repositories/HistoricRepository');
const { DB } = require('../../src/repositories/DB');

describe('HistoricRepository', () => {
  let historicRepository;
  beforeEach(async () => {
    const db = new DB();
    const dbConnection = await db.dbConnection();
    historicRepository = new HistoricRepository(dbConnection);
  });

  afterAll(() => {
    historicRepository.closeDB();
  });
  it('should create order', async () => {
    // const order = [
    //   {
    //     client: 1231,
    //     type: 'buy',
    //     amount: 20,
    //     value: 508.8,
    //   },
    //   {
    //     client: 1231,
    //     type: 'sell',
    //     amount: 15,
    //     value: 600,
    //   },
    // ];
    const order = {
      client: 1231,
      type: 'buy',
      amount: 20,
      value: 508.8,
    };

    const resulted = await historicRepository.create(order);
    console.log(resulted);
    expect(resulted).toEqual(expect.any(Object));
  });
});
