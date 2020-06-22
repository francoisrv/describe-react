import { ExpectPropertyFn } from '../../types'

export default class ExpectProperty {
  fn: ExpectPropertyFn

  constructor(fn: ExpectPropertyFn | RegExp) {
    if (fn instanceof RegExp) {
      this.fn = value => fn.test(value)
    } else {
      this.fn = fn
    }
  }
}

export function expectProperty(fn: ExpectPropertyFn | RegExp) {
  return new ExpectProperty(fn)
}
