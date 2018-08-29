import { IRepository } from '../drivenAdapters/IRepository'

interface IUnitOfWork {
  register(repo: IRepository): void,
  commit(): void,
}

export {
  IUnitOfWork,
}
