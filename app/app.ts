import express from 'express';
import morgan from 'morgan';
import debug from 'debug';
import * as bodyParser from 'body-parser';

import { TransactionController } from './controllers';

debug('ts-express:server');

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.serve();
  }

  private middleware() {
    this.app.use(morgan('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes() {
    this.app.use('/api/transactions', TransactionController);
  }

  private serve() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    });
  }
}

export default new App().app;
