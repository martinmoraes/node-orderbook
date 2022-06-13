const { OrderUseCase } = require('../../src/useCase/OrderUseCase.js');

describe('OrderUseCase', () => {
  let orderUseCase;
  beforeEach(() => {
    orderUseCase = new OrderUseCase();
  });
  it('should retrun array of objects', () => {
    const orders = [
      { value: '12345', type: 'Compra' },
      { value: '12346', type: 'venda' },
      { value: '12347', type: 'Compra' },
    ];
    const resultedArrays = orderUseCase.organizeMessage(orders);
    console.log(resultedArrays);
    expect(resultedArrays).toEqual(
      expect.arrayContaining([
        { key: '111', value: '{"value":"12345","type":"Compra"}' },
        { key: '111', value: '{"value":"12346","type":"venda"}' },
        { key: '111', value: '{"value":"12347","type":"Compra"}' },
      ]),
    );
  });
  it('should retrun array of one objects', () => {
    const orders = { value: '12345', type: 'Compra' };
    const resultedArrays = orderUseCase.organizeMessage(orders);
    console.log(resultedArrays);
    expect(resultedArrays).toEqual(
      expect.arrayContaining([
        { key: '111', value: '{"value":"12345","type":"Compra"}' },
      ]),
    );
  });
  it('should ', async () => {
    const value = JSON.stringify({ value: '12345', type: 'Compra' });
    const message = [{ key: '111', value }];
    const resultOrder = await orderUseCase.produce(message);
    console.log(resultOrder);
    expect(resultOrder).toEqual(
      expect.arrayContaining([
        {
          topicName: 'ORDER',
          partition: 0,
          errorCode: 0,
          baseOffset: expect.any(String),
          logAppendTime: '-1',
          logStartOffset: '0',
        },
      ]),
    );
  });
});
