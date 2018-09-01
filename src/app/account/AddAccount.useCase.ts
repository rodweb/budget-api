import AccountFactory from '../../domain/Account.factory'
import { IAccountRepository } from '../ports/drivenAdapters/IAccount.repository'
import { IUnitOfWork } from '../ports/drivingAdapters/IUnitOfWork'

export class AddAccountUseCase {

  constructor(
    private uow: IUnitOfWork,
    private accountRepository: IAccountRepository) {
  }

  execute = async (accountName: string) => {
    const account = AccountFactory.create(accountName)
    this.accountRepository.add(account)
    this.uow.commit()
  }

}
