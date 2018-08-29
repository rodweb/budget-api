import { Account } from '../../../domain/Account.domain'

export interface IAccountRepository {
  add(account: Account): void,
  findOne(id: number): Promise<Account>,
}
