type AssertTypeHandler =
(type: string | React.ComponentType<any>) => void

export default class AssertType {
  assert: AssertTypeHandler
  label: string = ''
  constructor(assert: AssertTypeHandler, label?: string) {
    this.assert = assert
    if (label) {
      this.label = label
    }
  }
}

export function assertType(...args: ConstructorParameters<typeof AssertType>) {
  return new AssertType(...args)
}
