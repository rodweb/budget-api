import express from 'express';
import morgan from 'morgan';
import debug from 'debug';
import 'reflect-metadata';
import * as bodyParser from 'body-parser';

import { createConnection } from 'typeorm';

import { TransactionController } from './controllers';
import { User } from './models/user.model';

debug('ts-express:server');

class App {
  public app: express.Application;

  constructor() {
    this.database();
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

  private database() {
  //   createConnection().then(async (connection) => {
  //     const user = new User();
  //     user.firstName = 'Rodrigo';
  //     user.lastName = 'Campos';
  //     user.age = 25;
  //     await connection.manager.save(user);

  //     const users = await connection.manager.find(User);
  //     console.log('Users');
  //     console.log(users);
  //   }).catch(error => console.log(error));
  }
}

export default new App().app;
