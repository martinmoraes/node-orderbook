const { EntryPointExpress } = require('./entrypoint/express/EntryPointExpress');

(() => {
  try {
    // const synchronizeDB = new SynchronizeDB();
    // await synchronizeDB.execute();
    new EntryPointExpress().execute();
  } catch (error) {
    console.log('Aplicação encerrada: ', error);
    process.exit(1);
  }
})();
