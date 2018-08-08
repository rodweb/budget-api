import IAccountRepository from '../../repositories/account.repository';
import { Account } from '../../domain/account.domain';

export class CreateAccountUsecase {

  constructor(private accountRepository: IAccountRepository) {
  }

  execute = async(account: Account) => {
    if (!account.name) throw new Error('name_not_informed');

    return await this.accountRepository.save(account);
  }
}
