import { Connection, Repository } from 'typeorm';
import { Transaction } from '../models/transaction.model';
import * as domain from '../domain/transaction.domain';
import { IRepository } from './repository';

export interface ITransactionRepository {
  find(id: number): Promise<Transaction | undefined>;
  save(transaction: domain.Transaction): Promise<domain.Transaction>;
}

export default class TransactionRepository implements ITransactionRepository {
  private readonly repo: Repository<Transaction>;

  constructor(private readonly conn: Connection) {
    this.repo = conn.getRepository(Transaction);
  }

  find = async(id: number) => this.repo.findOne(id);
  save = async(transaction: domain.Transaction) => this.repo.save(transaction)
    .then(x => x as domain.Transaction)
}
