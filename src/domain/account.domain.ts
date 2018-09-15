import { Transaction, TransactionType } from './transaction.domain'
import { TransactionFactory } from './Transaction.factory'

class Account {
  id?: number = undefined
  name: string
  transactions: Transaction[] = []

  constructor(name: string) {
    this.name = name
  }

  transferTo(destination: Account, description: string, amount: number): void  {
    if (amount < 0) {
      throw new Error(' Cannot transfer negative amount')
    }
    const transaction = TransactionFactory.create(description, amount, this, destination)
    this.addTransaction(transaction)
  }

  addTransaction(transaction: Transaction): void {
    if (!this.equals(transaction.from) && !this.equals(transaction.to)) {
      throw new Error(' Invalid account')
    }
    this.transactions.push(transaction)
  }

  equals = (other: Account): boolean => this.id === other.id && this.id !== undefined
}

export {
  Account,
}
