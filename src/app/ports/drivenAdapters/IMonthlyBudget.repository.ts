import { Guid } from 'guid-typescript'
import { MonthlyBudget } from '../../../domain/MonthlyBudget.domain'

interface IMonthlyBudgetRepository {
  findById(id: Guid): Promise<MonthlyBudget>
}

export {
  IMonthlyBudgetRepository,
}
