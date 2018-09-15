import { Account } from '../../../domain/account.domain'

export interface IAccountRepository {
  add(account: Account): void,
  findOne(id: number): Promise<Account>,
}
