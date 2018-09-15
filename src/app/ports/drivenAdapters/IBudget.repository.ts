import { Guid } from 'guid-typescript'
import { Budget } from '../../../domain/Budget.domain'

interface IBudgetRepository {
  findById(id: Guid): Promise<Budget>
  add(budget: Budget): void
}

export {
  IBudgetRepository,
}
