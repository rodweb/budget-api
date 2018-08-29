import 'mocha'
import { assert, expect } from 'chai'
import * as TypeMoq from 'typemoq'
import { Payee } from '../../../src/domain/payee.domain'
import { IPayeeRepository } from '../../../src/repositories/payee.repository'
import { AddPayeeUseCase } from '../../../src/app/payee/add-payee-use.case'

describe('Adding payee', () => {
  describe('When valid payee info is passed', () => {
    it('Should create payee', async () => {
      const validPayee: Payee = { name: 'My Payee' }

      const mock = TypeMoq.Mock.ofType<IPayeeRepository>()
      mock
        .setup(x => x.save(validPayee))
        .returns(() => Promise.resolve(validPayee))

      // @ts-ignore
      const useCase = new AddPayeeUseCase(mock.object)
      const result = await useCase.execute(validPayee)

      expect(result).to.be.equals(validPayee)
    })
  })

  describe('When invalid payee info is passed', () => {
    it('Should throw an error', (done) => {
      const invalidPayee = { name: '' }

      const mock = TypeMoq.Mock.ofType<IPayeeRepository>()

      // @ts-ignore
      const useCase = new AddPayeeUseCase(mock.object)
      useCase.execute(invalidPayee)
        .catch((error: Error) => {
          expect(error.message).to.be.equals('name_not_informed')
          done()
        })
    })
  })
})
