import { ITransactionRepository } from '../../repositories/transaction.repository'
import { Transaction } from '../../domain/transaction.domain'
import { IEventEmitter } from '../../infra/events/eventEmitter'
import domainEvents from '../../domain/domainEvents'

export class AddTransactionUseCase {

  constructor(private transactionRepository: ITransactionRepository, private event: IEventEmitter) {

  }

  execute = async(transactionToAdd: Transaction) => {
    if (!transactionToAdd.description) throw new Error('description_not_informed')

    const transactionAdded = await this.transactionRepository.save(transactionToAdd)

    this.event.emit(domainEvents.transaction.added, transactionAdded)
  }
}
