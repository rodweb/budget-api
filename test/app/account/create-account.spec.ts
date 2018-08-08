import 'mocha';
import * as TypeMoq from 'typemoq';
const expect = require('chai').expect;
import { Account } from '../../../src/domain/account.domain';
import { CreateAccountUsecase } from '../../../src/app/account/create-account.usecase';
import { IAccountRepository } from '../../../src/repositories/account.repository';

describe('Creating account', () => {
  describe('When valid account info is passed', () => {
    it('Should create account', async () => {
      const validAccount: Account = { name: 'My Bank' };

      const mock = TypeMoq.Mock.ofType<IAccountRepository>();
      mock
        .setup(x => x.save(validAccount))
        .returns(() => Promise.resolve(validAccount));

      // @ts-ignore
      const createAccountUseCase = new CreateAccountUsecase(mock.object);
      const result = await createAccountUseCase.execute(validAccount);

      expect(result).to.be.equals(validAccount);
    });
  });

  describe('When invalid account info is passed', () => {
    it('Should throw an error', (done) => {
      const invalidAccount = { name: '' };

      const mock = TypeMoq.Mock.ofType<IAccountRepository>();

      // @ts-ignore
      const createAccountUseCase = new CreateAccountUsecase(mock.object);
      createAccountUseCase.execute(invalidAccount)
        .catch((error: Error) => {
          expect(error.message).to.be.equals('name_not_informed');
          done();
        });
    });
  });
});
