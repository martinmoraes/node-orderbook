const { ConsumerUseCase } = require('../src/useCase/ConsumerUseCase');
const { DB } = require('../src/repositories/DB');
const {
  HistoricRepository,
} = require('../src/repositories/HistoricRepository');
const {
  OrderBookRepository,
} = require('../src/repositories/OrderBookRepository');

(async () => {
  try {
    const db = new DB();
    const dbConnection = await db.dbConnection();
    const historicRepository = new HistoricRepository(dbConnection);
    const orderBookRepository = new OrderBookRepository(dbConnection);
    new ConsumerUseCase(historicRepository, orderBookRepository).execute();
  } catch (error) {
    console.log('Aplicação encerrada: ', error);
    process.exit(1);
  }
})();
