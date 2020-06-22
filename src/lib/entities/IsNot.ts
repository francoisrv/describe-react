export default class IsNot<T> {
  value: T
  constructor(value: T) {
    this.value = value
  }
}

export function isNot(value: any) {
  return new IsNot(value)
}