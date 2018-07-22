import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import debug from 'debug';

import { scopePerRequest } from 'awilix-express';
import awilix = require('awilix');
import { asClass } from 'awilix';
import * as bodyParser from 'body-parser';

import { UserController, TransactionController } from './controllers';

debug('ts-express:server');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

const formatName = (filename: string) => {
  console.log(filename);
  const [ name, type ] = filename.split('.');
  if (!type) return name;
  return `${name}${type.charAt(0).toUpperCase()}${type.substring(1)}`;
}

container.loadModules([
  '**/*[controller|service|repository].js',
], {
  formatName,
  cwd: `${__dirname}/../build`,
  resolverOptions: {
    injectionMode: awilix.InjectionMode.CLASSIC,
  },
});

// container.register({
//   userRepository: asClass(UserRepository).classic(),
//   userService: asClass(UserService).classic(),
//   userController: asClass(UserController).classic(),
//   transactionController: asClass(TransactionController).classic(),
// });

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
    this.app.use(scopePerRequest(container));
  }

  private routes() {
    this.app.use('/api/users', container.resolve<UserController>('userController').router);
    // this.app.use('/api/users', container.cradle.userController.router);
    this.app.use('/api/transactions',
      container.resolve<TransactionController>('transactionController').router);
    // this.app.use('/api/transactions', container.cradle.transactionController.router);
  }

  private serve() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    });
  }

  private database() {
  }
}

export default new App().app;
