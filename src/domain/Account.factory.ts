import { Account } from './Account.domain'

class AccountFactory {
  static create = (name: string): Account => new Account(name)
}

export default AccountFactory
