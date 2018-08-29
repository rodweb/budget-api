import { Payee } from '../../domain/payee.domain'
import { IPayeeRepository } from '../../repositories/payee.repository'

export class AddPayeeUseCase {

  constructor(private payeeRepository: IPayeeRepository) {
  }

  execute = async(account: Payee) => {
    if (!account.name) throw new Error('name_not_informed')

    return await this.payeeRepository.save(account)
  }
}
