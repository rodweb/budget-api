import { Guid } from 'guid-typescript'
import { IBudgetRepository } from '../ports/drivenAdapters/IBudget.repository'
import { IUnitOfWork } from '../ports/drivingAdapters/IUnitOfWork'

class SpendBudgetUseCase {
  constructor(private uow: IUnitOfWork, private budgetRepo: IBudgetRepository) {
  }

  async execute(id: Guid, amount: number) {
    const budget = await this.budgetRepo.findById(id)

    budget.spend(amount)

    this.uow.commit()
  }
}
