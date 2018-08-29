import { Account } from './account.domain'

enum TransactionType {
  Credit,
  Debit,
}

class Transaction {
  id?: number
  description: string
  amount: number
  // date: Date
  // payee: Payee
  from: Account
  to: Account

  constructor(
    description: string, amount: number, from: Account, to: Account) {
    this.description = description
    this.amount = amount
    this.from = from
    this.to = to
  }
}

export {
  TransactionType,
  Transaction,
}
