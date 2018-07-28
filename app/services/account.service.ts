import { Account } from '../models/account.model';
import { IAccountRepository } from '../repositories/account.repository';

interface AccountDTO {
  name: string;
}

interface IAccountService {
  create(account: AccountDTO): Promise<AccountDTO>;
  findOne(id: number): Promise<AccountDTO | undefined>;
  findByUserId(id: number): Promise<AccountDTO[]>;
  findByIds(ids: number[]): Promise<AccountDTO[]>;
}

export default class AccountService implements IAccountService {
  constructor(private accountRepository: IAccountRepository) {
    console.log('New AccountService');
  }

  public async findOne(id: number) {
    return this.accountRepository.find(id);
  }

  public async findByUserId(id: number) {
    return this.accountRepository.findAll();
  }

  public findByIds = async (ids: number[]) => {
    return this.accountRepository.findByIds(ids);
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
