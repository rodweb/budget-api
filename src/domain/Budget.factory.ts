import { Budget } from './Budget.domain'
import { Guid } from 'guid-typescript'

class BudgetFactory {
  static create(name: string) {
    return new Budget(Guid.createEmpty(), name)
  }
}

export {
  BudgetFactory,
}
