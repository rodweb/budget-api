import { IRepository } from '../repositories/repository';
import { Account } from '../models/account.model';

interface AccountDTO {
  name: string;
}

interface IAccountService {
  create(account: AccountDTO): Promise<AccountDTO>;
  findOne(id: number): Promise<AccountDTO | undefined>;
}

export default class AccountService implements IAccountService {
  constructor(private readonly accountRepository: IRepository<Account>) {
  }

  public async findOne(id: number) {
    return this.accountRepository.find(id);
  }

  public async create(account: AccountDTO) {
    const {
      name,
    } = account;

    const { id } = await this.accountRepository
      .save({ ...account } as Account);

    return {
      ...account,
      id,
    };
  }
}

export {
  IAccountService,
  AccountDTO,
};
