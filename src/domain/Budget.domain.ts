import { Guid } from 'guid-typescript'

type Name = string
type Amount = number

class Budget {
  private _id: Guid
  private _name: Name
  private _goal: Amount = 0
  private _budgeted: Amount = 0
  private _spent: Amount = 0

  constructor(id: Guid, name: Name) {
    this._id = id
    this._name = name
    if (this._id.isEmpty()) {
      this._id = Guid.create()
    }
  }

  get name(): Name { return this._name }
  get goal(): Amount { return this._goal }
  get budgeted(): Amount { return this._budgeted }
  get spent(): Amount { return this._spent }
  get available() { return this._budgeted - this._spent }

  spend(amount: Amount) {
    this._spent += amount
  }
}

export {
  Budget,
}
