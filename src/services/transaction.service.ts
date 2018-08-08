
import { IRepository } from '../repositories/repository';
import { Transaction } from '../models/transaction.model';
import { IPeriodService } from './period.service';
import { Account } from '../models/account.model';
import { Period } from '../models/period.model';

interface TransactionDTO {
  id?: number;
  accountId: number;
  description: string;
  amount: number;
  date: Date;
}

interface ITransactionService {
  create(transaction: TransactionDTO): Promise<TransactionDTO>;
}

export default class TransactionService implements ITransactionService {
  constructor(private transactionRepository: IRepository<Transaction>,
              private periodService: IPeriodService) {
  }

  public async create(transaction: TransactionDTO) {
    const { accountId, description, amount, date } = transaction;

    transaction.date = new Date(transaction.date);
    const year = transaction.date.getFullYear();
    const month = transaction.date.getMonth();

    const period = await this.periodService.getOrCreate(year, month);

    const { id } = await this.transactionRepository
      .save({
        description,
        amount,
        date,
        period: period as Period,
        account: { id: accountId } as Account,
        id: 0,
      });

    return {
      ...transaction,
      id,
    };
  }
}

export {
  ITransactionService,
  TransactionDTO,
};
