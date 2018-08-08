import { Entity, OneToMany, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { Transaction } from './transaction.model';

@Entity()
@Unique(['year', 'month'])
export class Period {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  year: number = 0;

  @Column()
  month: number = 0;

  @OneToMany(type => Transaction, transaction => transaction.period)
  transactions!: Transaction[];
}
