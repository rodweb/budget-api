import { Guid } from 'guid-typescript'
import { Budget } from './Budget.domain'

type Name = string
type Amount = number
type Year = number
type Month = number

class MonthlyBudget {
  private _id: Guid
  private _budgets: Budget[] = []

  constructor(id: Guid, year: Year, month: Month) {
    this._id = id
    if (this._id.isEmpty()) {
      this._id = Guid.create()
    }
  }

  createBudget(name: Name) {
  }
}
