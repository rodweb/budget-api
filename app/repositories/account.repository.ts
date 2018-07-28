import { Repository, Connection } from 'typeorm';

import { Account } from '../models/account.model';

import { IRepository } from './repository';

interface IAccountRepository extends IRepository<Account> {
  findAll(): Promise<Account[]>;
  findByIds(ids: number[]): Promise<Account[]>;
}

export default class AccountRepository implements IAccountRepository {
  private repo: Repository<Account>;

  constructor(private conn: Connection) {
    console.log('New AccountRepository');
    this.repo = conn.getRepository(Account);
  }

  async findByIds(ids: number[]) {
    return this.repo.findByIds(ids);
  }
  find = async(id: number) => {
    return this.repo.findOne(id);
  }
  findAll = async() => this.repo.find();
  save = async(account: Account) => this.repo.save(account);
}

export {
  IAccountRepository,
};
