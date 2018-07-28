import { Repository, Connection } from 'typeorm';

import { Account } from '../models/account.model';

import { IRepository } from './repository';

interface IAccountRepository extends IRepository<Account> {
  findAll(): Promise<Account[]>;
}

export default class AccountRepository implements IRepository<Account> {
  private repo: Repository<Account>;

  constructor(private conn: Connection) {
    this.repo = conn.getRepository(Account);
  }

  find = async(id: number) => this.repo.findOne(id);
  findAll = async() => this.repo.find();
  save = async(account: Account) => this.repo.save(account);
}

export {
  IAccountRepository,
};
