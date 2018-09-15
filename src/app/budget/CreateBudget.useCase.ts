import { BudgetFactory } from '../../domain/Budget.factory'
import { IBudgetRepository } from '../ports/drivenAdapters/IBudget.repository'
import { IUnitOfWork } from '../ports/drivingAdapters/IUnitOfWork'

class CreateBudgetUseCase {
  constructor(private uow: IUnitOfWork, private budgetRepo: IBudgetRepository) {
  }

  async execute(budgetName: string) {
    const budget = BudgetFactory.create(budgetName)

    this.budgetRepo.add(budget)

    this.uow.commit()
  }
}

export {
  CreateBudgetUseCase,
}
