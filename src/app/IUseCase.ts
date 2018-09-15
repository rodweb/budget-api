interface IUseCase {
  execute<Tin, Tout>(input: Tin): Promise<Tout> | void
}

export {
  IUseCase,
}
