import { ExpectPropertyValueFn } from '../../types'

export default class ExpectPropertyValue {
  fn: ExpectPropertyValueFn
  constructor(fn: ExpectPropertyValueFn) {
    this.fn = fn
  }
}

export function expectPropertyValue(fn: ExpectPropertyValueFn) {
  return new ExpectPropertyValue(fn)
}