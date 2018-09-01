import { IUnitOfWork } from '../ports/drivingAdapters/IUnitOfWork'
import { IAccountRepository } from '../ports/drivenAdapters/IAccount.repository'

type AccountId = number
type Amount = number
type Description = string

export class TransferMoneyUseCase {
  constructor(
    private uow: IUnitOfWork,
    private accountRepository: IAccountRepository) {
  }

  execute = async (from: AccountId, to: AccountId, description: Description, amount: Amount) => {
    const origin = await this.accountRepository.findOne(from)
    const destination = await this.accountRepository.findOne(to)
    origin.transferTo(destination, description , amount)
    this.uow.commit()
  }
}
