const express = require('express');
const path = require('path');
require('dotenv/config');

class EntryPointExpress {
  execute() {
    let app = express();

    app.use(express.json());

    app.listen(process.env.PORT, () =>
      console.log(
        `Start Express, servidor está rodando na porta ${process.env.PORT}`,
      ),
    );
  }
}

module.exports = { EntryPointExpress };
