type Assertor<T> = (a: T, e: any) => void

export default class Assert<T> {
  assert: Assertor<T>
  label: string = ''
  constructor(assert: Assertor<T>, label?: string) {
    this.assert = assert
    if (label) {
      this.label = label
    }
  }
}

export function assert<T>(...args: ConstructorParameters<typeof Assert>) {
  return new Assert<T>(...args)
}
