import { Repository, createConnection } from 'typeorm';
import { Period } from '../models/period.model';

export interface IPeriodRepository {
  get(year: number, month: number): Promise<Period | undefined>;
  save(year: number, month: number): Promise<Period>;
}

export default class PeriodRepository implements IPeriodRepository {
  private repo!: Repository<Period>;

  constructor() {
    createConnection().then((conn) => {
      this.repo = conn.getRepository(Period);
    });
  }

  get = async(year: number, month: number) => this.repo.findOne({ year, month });
  save = async(year: number, month: number) => this.repo.save({ year, month } as Period);
}
