import { Account } from './account.domain';

type Credit = 'credit';
type Debit = 'debit';
type TransactionType = Credit | Debit;

const CREDIT = 'credit' as Credit;
const DEBIT = 'debit' as Debit;

interface Transaction {
  id?: number;
  description: string;
  amount: number;
  type: TransactionType,
  to: Account,
  from?: Account,
}

export {
  TransactionType,
  Transaction,
  CREDIT,
  DEBIT,
};
