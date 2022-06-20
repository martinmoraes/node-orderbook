const { ConsumerUseCase } = require('../../src/useCase/ConsumerUseCase');
const { DB } = require('../../src/repositories/DB');
const {
  HistoricRepository,
} = require('../../src/repositories/HistoricRepository');
const {
  OrderBookRepository,
} = require('../../src/repositories/OrderBookRepository');

describe('ConsumerUseCase', () => {
  let consumerUseCase;
  let historicRepository;
  let orderBookRepository;
  beforeEach(async () => {
    const db = new DB();
    const dbConnection = await db.dbConnection();
    historicRepository = new HistoricRepository(dbConnection);
    orderBookRepository = new OrderBookRepository(dbConnection);
    consumerUseCase = new ConsumerUseCase(
      historicRepository,
      orderBookRepository,
    );
  });

  afterEach(() => {
    historicRepository.closeDB();
    orderBookRepository.closeDB();
  });

  it('should sell order with typeSale', async () => {
    const message = {
      client: 2222,
      type: 'sell',
      orderType: 'limit',
      amount: 30,
      value: 10,
      datatime: '2022-06-14T21:28:51.900Z',
    };
    const historic = {};
    historic.message = message;
    const resulted = await consumerUseCase.executeLimitSell(historic);
  });

  it('should buy', async () => {
    const message = {
      client: 2222,
      type: 'buy',
      orderType: 'limit',
      amount: 35,
      value: 500,
      datatime: '2022-06-14T21:28:51.900Z',
    };
    const historic = {};
    historic.message = message;
    const resulted = await consumerUseCase.executeLimitBuy(historic);
  });

  it('should Market Buy', async () => {
    const message = {
      client: 2222,
      type: 'buy',
      orderType: 'market',
      amount: 35,
      value: 500,
      datatime: '2022-06-14T21:28:51.900Z',
    };
    const historic = {};
    historic.message = message;
    const resulted = await consumerUseCase.executeMarketBuy(historic);
  });

  it('should Market sell', async () => {
    const message = {
      client: 2222,
      type: 'sell',
      orderType: 'market',
      amount: 35,
      value: 100,
      datatime: '2022-06-14T21:28:51.900Z',
    };
    const historic = {};
    historic.message = message;
    const resulted = await consumerUseCase.executeMarketSell(historic);
  });
});
