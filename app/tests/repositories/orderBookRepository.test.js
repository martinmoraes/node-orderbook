const {
  OrderBookRepository,
} = require('../../src/repositories/OrderBookRepository');
const { DB } = require('../../src/repositories/DB');

describe('OrderBookRepository', () => {
  let orderBookRepository;
  beforeEach(async () => {
    const db = new DB();
    const dbConnection = await db.dbConnection();
    orderBookRepository = new OrderBookRepository(dbConnection);
  });

  afterAll(() => {
    orderBookRepository.closeDB();
  });

  it('should create orderbook', async () => {
    // const orderBook = {
    //   client: 1240,
    //   type: 'sell',
    //   operation: 'market',
    //   amount: 15,
    //   value: 200,
    //   datatime: '2022-06-14T21:28:5.900Z',
    // };
    let orderBook;

    orderBook = {
      client: 1120,
      type: 'buy',
      orderType: 'limit',
      amount: 10,
      value: 100,
      datatime: '2022-06-14T21:32:51.900Z',
    };
    await orderBookRepository.create(orderBook);

    orderBook = {
      client: 1121,
      type: 'buy',
      orderType: 'limit',
      amount: 10,
      value: 200,
      datatime: '2022-06-14T21:33:51.900Z',
    };
    await orderBookRepository.create(orderBook);

    orderBook = {
      client: 1122,
      type: 'buy',
      orderType: 'limit',
      amount: 10,
      value: 300,
      datatime: '2022-06-14T21:34:51.900Z',
    };
    await orderBookRepository.create(orderBook);

    orderBook = {
      client: 1123,
      type: 'buy',
      orderType: 'limit',
      amount: 10,
      value: 400,
      datatime: '2022-06-14T21:35:51.900Z',
    };
    await orderBookRepository.create(orderBook);

    orderBook = {
      client: 1124,
      type: 'buy',
      orderType: 'limit',
      amount: 10,
      value: 500,
      datatime: '2022-06-14T21:36:51.900Z',
    };
    await orderBookRepository.create(orderBook);
  });

  it('should ', async () => {
    let orderBook;

    orderBook = {
      client: 1120,
      type: 'sell',
      orderType: 'limit',
      amount: 10,
      value: 100,
      datatime: '2022-06-14T21:32:51.900Z',
    };
    await orderBookRepository.create(orderBook);

    orderBook = {
      client: 1121,
      type: 'sell',
      orderType: 'limit',
      amount: 10,
      value: 200,
      datatime: '2022-06-14T21:33:51.900Z',
    };
    await orderBookRepository.create(orderBook);

    orderBook = {
      client: 1122,
      type: 'sell',
      orderType: 'limit',
      amount: 10,
      value: 300,
      datatime: '2022-06-14T21:34:51.900Z',
    };
    await orderBookRepository.create(orderBook);

    orderBook = {
      client: 1123,
      type: 'sell',
      orderType: 'limit',
      amount: 10,
      value: 400,
      datatime: '2022-06-14T21:35:51.900Z',
    };
    await orderBookRepository.create(orderBook);

    orderBook = {
      client: 1124,
      type: 'sell',
      orderType: 'limit',
      amount: 10,
      value: 500,
      datatime: '2022-06-14T21:36:51.900Z',
    };
    await orderBookRepository.create(orderBook);
  });

  it('should find orderbook', async () => {
    // const value = 600;
    const value = 50;

    const resulted = await orderBookRepository.findOrderBook('buy', value);
    console.log(resulted);
    expect(resulted).toEqual(expect.any(Object));
  });

  it('should delete by id', async () => {
    const resultedFind = await orderBookRepository.findBuyOrderBook(520);
    const resulted = await orderBookRepository.deleteById(resultedFind[0]._id);
    console.log(resulted);
  });

  it('should update by id', async () => {
    const resultedFind = await orderBookRepository.findBuyOrderBook(10);
    const resulted = await orderBookRepository.updateById(
      resultedFind[0]._id,
      1,
    );
    console.log(resulted);
  });
});
