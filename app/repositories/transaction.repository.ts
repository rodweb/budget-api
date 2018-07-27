import { Repository, createConnection } from 'typeorm';
import { Transaction } from '../models/transaction.model';

import { IRepository } from './repository';

export default class TransactionRepository implements IRepository<Transaction> {
  private repo!: Repository<Transaction>;
  constructor() {
    createConnection().then((conn) => {
      this.repo = conn.getRepository(Transaction);
    });
  }

  find = async(id: number) => this.repo.findOne(id);
  save = async(transaction: Transaction) => this.repo.save(transaction);
}
