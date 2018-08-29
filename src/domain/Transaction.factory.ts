import { Transaction, TransactionType } from './Transaction.domain'
import { Account } from './Account.domain'

class TransactionFactory {
  static create = (
    description: string,
    amount: number,
    from: Account,
    to: Account): Transaction =>
    new Transaction(description, amount, from, to)
}

export {
  TransactionFactory,
}
