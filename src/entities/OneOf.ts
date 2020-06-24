export default class OneOf<T> {
  private readonly values: T[] = []
  constructor(...values: T[]) {
    this.values = values
  }
}

export function oneOf(...args: ConstructorParameters<typeof OneOf>) {
  return new OneOf(...args)
}
