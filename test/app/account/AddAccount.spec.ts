import 'mocha'
import * as TypeMoq from 'typemoq'
const expect = require('chai').expect
import { Account } from '../../../src/domain/account.domain'
import { AddAccountUseCase } from '../../../src/app/account/AddAccount.useCase'
import { IUnitOfWork } from '../../../src/app/ports/drivingAdapters/IUnitOfWork'
import { IAccountRepository } from '../../../src/app/ports/drivenAdapters/IAccount.repository'

describe('Adding account', () => {
  describe('When valid from info is passed', () => {
    it('Should create account', async () => {
      const accountName = 'My Bank'
      const validAccount: Account = { name: accountName }

      const uowMock = TypeMoq.Mock.ofType<IUnitOfWork>()
      const repoMock = TypeMoq.Mock.ofType<IAccountRepository>()

      const useCase = new AddAccountUseCase(uowMock.object, repoMock.object)
      const result = await useCase.execute(' My Bank')

      uowMock.verify(x => x.commit(), TypeMoq.Times.atLeastOnce())
      expect(result).to.be.equals(validAccount)
    })
  })

  describe('When invalid from info is passed', () => {
    it('Should throw an error', (done) => {
      const invalidAccount = { name: '' }

      const mock = TypeMoq.Mock.ofType<IAccountRepository>()

      // @ts-ignore
      const createAccountUseCase = new AddAccountUseCase(mock.object)
      createAccountUseCase.execute(invalidAccount)
        .catch((error: Error) => {
          expect(error.message).to.be.equals('name_not_informed')
          done()
        })
    })
  })
})
