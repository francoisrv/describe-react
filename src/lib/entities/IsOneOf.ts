export default class IsOneOf<T> {
  values: T[] = []
  constructor(...values: T[]) {
    this.values = values
  }
}

export function isOneOf(...values: any[]) {
  return new IsOneOf(...values)
}