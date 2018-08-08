import { ITransactionRepository } from '../../repositories/transaction.repository';
import { Transaction } from '../../domain/transaction.domain';

export class AddTransactionUseCase {

  constructor(private transactionRepository: ITransactionRepository) {
  }

  execute = async(transaction: Transaction) => {
    if (!transaction.description) throw new Error('description_not_informed');

    return await this.transactionRepository.save(transaction);
  }
}
