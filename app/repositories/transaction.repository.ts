import { Repository, Connection } from 'typeorm';

import { Transaction } from '../models/transaction.model';

import { IRepository } from './repository';

export default class TransactionRepository implements IRepository<Transaction> {
  private repo!: Repository<Transaction>;

  constructor(private conn: Connection) {
    this.repo = conn.getRepository(Transaction);
  }

  find = async(id: number) => this.repo.findOne(id);
  save = async(transaction: Transaction) => this.repo.save(transaction);
}
