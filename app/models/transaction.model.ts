import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from 'typeorm';
import { Account } from './account.model';
import { Period } from './period.model';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  description: string = '';

  @Column({ type: 'decimal' })
  amount: number = 0;

  @Column({ type: 'timestamp' })
  date: Date = new Date();

  @ManyToOne(type => Account, account => account.transactions)
  account!: Account;

  @ManyToOne(type => Period, period => period.transactions)
  period!: Period;
}
