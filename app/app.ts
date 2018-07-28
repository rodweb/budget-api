import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import debug from 'debug';
import awilix = require('awilix');
import graphqlHTTP from 'express-graphql';
import { scopePerRequest } from 'awilix-express';
import * as bodyParser from 'body-parser';
import { AppSchema } from './schemas/app.schema';
import { asFunction } from 'awilix';
import { createConnection, getConnection } from 'typeorm';

debug('ts-express:server');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

const formatName = (filename: string) => {
  const [name, type] = filename.split('.');
  if (!type) return name;
  return `${name}${type.charAt(0).toUpperCase()}${type.substring(1)}`;
};

container.loadModules([
  '**/*[controller|service|repository].js',
], {
  formatName,
  cwd: `${__dirname}/../build`,
  resolverOptions: {
    injectionMode: awilix.InjectionMode.CLASSIC,
  },
});

class App {
  public app!: express.Application;

  constructor() {
    this.database().then(() => {
      this.app = express();
      this.middleware();
      this.routes();
      this.serve();
    });
  }

  private middleware() {
    this.app.use(morgan('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(scopePerRequest(container));
  }

  private routes() {
    this.app.use('/graphql', graphqlHTTP({
      schema: AppSchema,
      context: container,
      graphiql: true,
    }));
    this.app.use('/api/accounts', container.cradle.accountController.router);
    this.app.use('/api/users', container.cradle.userController.router);
    this.app.use('/api/transactions', container.cradle.transactionController.router);
  }

  private serve() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    });
  }

  private async database() {
    await createConnection();
    container.register({
      conn: asFunction(() => getConnection()).singleton(),
    });
  }
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

function shutdown() {
  console.log('Received kill signal, shutting down gracefully');
  getConnection().close().then(() => process.exit(0));
  setTimeout(() => process.exit(1), 5000);
}

export default new App().app;
