
import { AwilixContainer } from 'awilix';
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
} from 'graphql';

import { IAccountService } from '../services/account.service';

// tslint:disable-next-line
const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: {
    id: { type: GraphQLInt },
    description: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    date: { type: GraphQLString },
  },
});

// tslint:disable-next-line
const AccountType = new GraphQLObjectType({
  name: 'Account',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    transactions: {
      type: new GraphQLList(TransactionType),
      resolve(value, args, container) {
        return [
          { description: 'Teste', amount: 1000 },
          { description: 'Teste 2', amount: 1000 },
        ];
      },
    },
  },
});

// tslint:disable-next-line
const PeriodType = new GraphQLObjectType({
  name: 'Period',
  fields: {
    id: { type: GraphQLInt },
    year: { type: GraphQLInt },
    month: { type: GraphQLInt },
    transactions: {
      type: new GraphQLList(TransactionType),
      resolve(value, args, container) {
        return [
          { description: 'Teste', amount: 1000 },
          { description: 'Teste 2', amount: 1000 },
        ];
      },
    },
  },
});

// tslint:disable-next-line
export const AppSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Budget',
    fields: {
      account: {
        type: AccountType,
        args: {
          id: { type: GraphQLInt },
        },
        resolve(value, args, container: AwilixContainer) {
          const accountService = container.resolve<IAccountService>('accountService');
          return accountService.findOne(args.id);
        },
      },
      accounts: {
        type: new GraphQLList(AccountType),
        resolve(value, args, container: AwilixContainer) {
          const accountService = container.resolve<IAccountService>('accountService');
          return accountService.findByUserId(1);
        },
      },
    },
  }),
});
