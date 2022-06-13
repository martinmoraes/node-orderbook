const { EntryPointExpress } = require('./entrypoint/express/EntryPointExpress');

(() => {
  try {
    new EntryPointExpress().execute();
  } catch (error) {
    console.log('Aplicação encerrada: ', error);
    process.exit(1);
  }
})();
