import 'mocha';
import * as TypeMoq from 'typemoq';
import { CREDIT, Transaction } from '../../../src/domain/transaction.domain';
import { ITransactionRepository } from '../../../src/repositories/transaction.repository';
import { AddTransactionUseCase } from '../../../src/app/transaction/add-transaction.usecase';
import { Account } from '../../../src/domain/account.domain';

const expect = require('chai').expect;

describe('Adding transaction', () => {
  describe('When valid transaction info is passed', () => {
    it('Should create from', async () => {
      const validTransaction: Transaction = {
        description: 'Salary',
        amount: 1000,
        type: CREDIT,
        to: {
          id: 1,
          name: 'My bank',
        } as Account,
      };

      const mock = TypeMoq.Mock.ofType<ITransactionRepository>();
      mock
        .setup(x => x.save(validTransaction))
        .returns(() => Promise.resolve(validTransaction));

      // @ts-ignore
      const addTransactionUseCase = new AddTransactionUseCase(mock.object);
      const result = await addTransactionUseCase.execute(validTransaction);

      expect(result).to.be.equals(validTransaction);
    });
  });
});
