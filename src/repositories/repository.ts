export interface IRepository<TEntity> {
  find(id: number): Promise<TEntity | undefined>;
  save(entity: TEntity): Promise<TEntity>;
}
