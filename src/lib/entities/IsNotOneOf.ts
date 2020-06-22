export default class IsNotOneOf<T> {
  values: T[] = []
  constructor(...values: T[]) {
    this.values = values
  }
}

export function isNotOneOf(...values: any[]) {
  return new IsNotOneOf(...values)
}