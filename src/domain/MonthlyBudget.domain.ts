import { Guid } from 'guid-typescript'
import { Budget } from './Budget.domain'

type Name = string
type Amount = number
type Year = number
type Month = number

class MonthlyBudget {
  private _id: Guid
  private _budgets: Budget[] = []
  private _year: Year
  private _month: Month
  private _budgeted: Amount = 0
  private _spent: Amount = 0

  constructor(id: Guid, year: Year, month: Month) {
    this._id = id
    this._year = year
    this._month = month
    if (this._id.isEmpty()) {
      this._id = Guid.create()
    }
  }

  get budgeted(): Amount { return this._budgeted }
  get spent(): Amount { return this._spent }
  get available() { return this._budgeted - this._spent }
}

export {
  MonthlyBudget,
}
