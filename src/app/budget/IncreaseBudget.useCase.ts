import { Guid } from 'guid-typescript'
import { IBudgetRepository } from '../ports/drivenAdapters/IBudget.repository'
import { IUnitOfWork } from '../ports/drivingAdapters/IUnitOfWork'

class IncreaseBudgetUseCase {
  constructor(private uow: IUnitOfWork, private budgetRepo: IBudgetRepository) {

  }

  async execute(id: Guid, amount: number) {
    const budget = await this.budgetRepo.findById(id)

    budget.increase(amount)

    this.uow.commit()
  }
}
