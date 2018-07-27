import { IPeriodRepository } from '../repositories/period.repository';

export interface IPeriodService {
  getOrCreate(year: number, month: number): Promise<PeriodDTO>;
}

export interface PeriodDTO {
  id?: number;
  year: number;
  month: number;
}

export default class PeriodService implements IPeriodService {
  constructor(private periodRepository: IPeriodRepository) {
  }

  async getOrCreate(year: number, month: number): Promise<PeriodDTO> {
    try {
      const res = await this.periodRepository.get(year, month);

      if (res) {
        const test = res as PeriodDTO;
        return test;
      }

      return await this.periodRepository.save(year, month) as PeriodDTO;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
