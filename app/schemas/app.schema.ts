import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { AwilixContainer } from 'awilix';
import { IAccountService } from '../services/account.service';

// tslint:disable-next-line
const AccountType = new GraphQLObjectType({
  name: 'Account',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
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
    },
  }),
});
