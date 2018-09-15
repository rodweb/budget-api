import { Guid } from 'guid-typescript'

type Name = string
type Amount = number

enum Tracking {
  None,
  Created,
  Deleted,
  Updated,
}

class Budget {
  private _id: Guid
  private _name: Name
  private _goal: Amount = 0
  private _budgeted: Amount = 0
  private _spent: Amount = 0
  private _tracking: Tracking = Tracking.None

  constructor(name: Name, id?: Guid) {
    this._name = name
    if (id) {
      this._id = id
    } else {
      this._id = Guid.create()
      this._tracking = Tracking.Created
    }
  }

  get tracking(): Tracking { return this._tracking }
  get name(): Name { return this._name }
  get goal(): Amount { return this._goal }
  get budgeted(): Amount { return this._budgeted }
  get spent(): Amount { return this._spent }
  get available() { return this._budgeted - this._spent }

  rename(name: Name) {
    this._tracking = Tracking.Updated
    this._name = name
  }

  spend(amount: Amount) {
    this._tracking = Tracking.Updated
    this._spent += amount
  }

  increase(amount: Amount) {
    this._tracking = Tracking.Updated
    this._budgeted += amount
  }

  decrease(amount: Amount) {
    this._tracking = Tracking.Updated
    this._budgeted -= amount
  }
}

export {
  Budget,
}
