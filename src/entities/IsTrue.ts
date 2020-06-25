export default class IsTrue<T> {
  constructor(
    readonly fn: (t: T) => boolean,
    readonly label: string
  ) {}
  
  execute(t: T) {
    expect(this.fn(t)).toBe(true)
  }
}

export function isTrue(...args: ConstructorParameters<typeof IsTrue>) {
  return new IsTrue(...args)
}