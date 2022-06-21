const { ConsumerService } = require('../serviceDomain/ConsumerService');
class ConsumerUseCase {
  constructor(historicRepository, orderBookRepository) {
    this.historicRepository = historicRepository;
    this.orderBookRepository = orderBookRepository;
  }

  async execute() {
    const consumerService = new ConsumerService();
    await consumerService.execute(this.executeCallBack.bind(this));
  }

  async executeCallBack(historic) {
    await this.executeLimitSell(historic);
    await this.executeMarketSell(historic);
    await this.executeLimitBuy(historic);
    await this.executeMarketBuy(historic);

    try {
      await this.historicRepository.create(historic);
    } catch (error) {
      console.log('Error register historic', error);
    }
  }

  async executeLimitBuy({ message }) {
    if (message.type === 'sell' || message.orderType !== 'limit') {
      return;
    }
    const orderbook = await this.orderBookRepository.findSellInOrderBook(
      message.value,
    );
    if (orderbook.length === 0) {
      return await this.orderBookRepository.create(message);
    }

    const amountBalance = await this.matchOrders(orderbook, message);

    if (amountBalance > 0) {
      const newMessage = { ...message, ...{ amount: amountBalance } };
      return await this.orderBookRepository.create(newMessage);
    }
  }

  async executeMarketBuy({ message }) {
    if (message.type === 'sell' || message.orderType !== 'market') {
      return;
    }
    const orderbook = await this.orderBookRepository.findSellInOrderBook();
    if (orderbook.length === 0) {
      return;
    }

    await this.matchOrders(orderbook, message);
  }

  async executeLimitSell({ message }) {
    if (message.type === 'buy' || message.orderType !== 'limit') {
      return;
    }
    const orderbook = await this.orderBookRepository.findBuyInOrderBook(
      message.value,
    );
    if (orderbook.length === 0) {
      return await this.orderBookRepository.create(message);
    }

    const amountBalance = await this.matchOrders(orderbook, message);

    if (amountBalance > 0) {
      const newMessage = { ...message, ...{ amount: amountBalance } };
      return await this.orderBookRepository.create(newMessage);
    }
  }

  async executeMarketSell({ message }) {
    if (message.type === 'buy' || message.orderType !== 'market') {
      return;
    }
    const orderbook = await this.orderBookRepository.findBuyInOrderBook();
    if (orderbook.length === 0) {
      return;
    }

    await this.matchOrders(orderbook, message);
  }

  async matchOrders(orderbook, message) {
    let amountBalance = message.amount;
    for (const orderBuy of orderbook) {
      if (orderBuy.amount === amountBalance) {
        await this.orderBookRepository.deleteById(orderBuy._id);
        amountBalance = 0;
        break;
      }
      if (orderBuy.amount < amountBalance) {
        await this.orderBookRepository.deleteById(orderBuy._id);
        amountBalance -= orderBuy.amount;
        continue;
      }
      if (orderBuy.amount > amountBalance) {
        const amount = orderBuy.amount - amountBalance;
        await this.orderBookRepository.updateById(orderBuy._id, amount);
        amountBalance = 0;
        break;
      }
    }
    return amountBalance;
  }
}

module.exports = { ConsumerUseCase };
