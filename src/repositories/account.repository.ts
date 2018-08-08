import { Repository, Connection } from 'typeorm';

import { Account } from '../models/account.model';

import * as domain from '../domain/account.domain';

import { IRepository } from './repository';

// interface IAccountRepository extends IRepository<Account> {
interface IAccountRepository {
  findAll(): Promise<Account[]>;
  findByIds(ids: number[]): Promise<Account[]>;
  save(account: domain.Account): Promise<domain.Account>;
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
  save = async(account: domain.Account) => this.repo.save(account).then(x => x as domain.Account);
}

export {
  IAccountRepository,
};
