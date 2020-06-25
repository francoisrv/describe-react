import printIs from './printIs'

const foo = (v: any) => v > 4

describe('Print Is', () => {
  describe('Simple checks', () => {
    it('Is anything', () => {
      expect(printIs({ anything: true }))
      .toEqual('is anything')
    })

    it('Is true', () => {
      expect(printIs({ true: true }))
      .toEqual('is true')
    })

    it('Is false', () => {
      expect(printIs({ false: true }))
      .toEqual('is false')
    })

    it('Is null', () => {
      expect(printIs({ null: true }))
      .toEqual('is null')
    })

    it('Is not null', () => {
      expect(printIs({ not: true, null: true }))
      .toEqual('is not null')
    })

    it('Is undefined', () => {
      expect(printIs({ undefined: true }))
      .toEqual('is undefined')
    })

    it('Is not undefined', () => {
      expect(printIs({ not: true, undefined: true }))
      .toEqual('is not undefined')
    })
  })
  describe('Type checks', () => {
    it('Is a string', () => {
      expect(printIs({ string: true }))
      .toEqual('is a string')
    })
    it('Is not a string', () => {
      expect(printIs({ not: true, string: true }))
      .toEqual('is not a string')
    })
    it('Is a number', () => {
      expect(printIs({ number: true }))
      .toEqual('is a number')
    })
    it('Is not a number', () => {
      expect(printIs({ not: true, number: true }))
      .toEqual('is not a number')
    })
    it('Is a boolean', () => {
      expect(printIs({ boolean: true }))
      .toEqual('is a boolean')
    })
    it('Is not a boolean', () => {
      expect(printIs({ not: true, boolean: true }))
      .toEqual('is not a boolean')
    })
    it('Is a date', () => {
      expect(printIs({ date: true }))
      .toEqual('is a date')
    })
    it('Is not a date', () => {
      expect(printIs({ not: true, date: true }))
      .toEqual('is not a date')
    })
    it('Is an object', () => {
      expect(printIs({ object: true }))
      .toEqual('is an object')
    })
    it('Is not an object', () => {
      expect(printIs({ not: true, object: true }))
      .toEqual('is not an object')
    })
    it('Is an array', () => {
      expect(printIs({ array: true }))
      .toEqual('is an array')
    })
    it('Is not an array', () => {
      expect(printIs({ not: true, array: true }))
      .toEqual('is not an array')
    })
    it('Is an error', () => {
      expect(printIs({ error: true }))
      .toEqual('is an error')
    })
    it('Is not an error', () => {
      expect(printIs({ not: true, error: true }))
      .toEqual('is not an error')
    })
    it('Is a regular expression', () => {
      expect(printIs({ regular: true, expression: true }))
      .toEqual('is a regular expression')
    })
    it('Is not a regular expression', () => {
      expect(printIs({ not: true, regular: true, expression: true }))
      .toEqual('is not a regular expression')
    })
  })
  describe('Equality checks', () => {
    it('is exactly', () => {
      expect(printIs({ exactly: 22 }))
      .toEqual('is exactly 22')
    })
    it('is not', () => {
      expect(printIs({ not: 22 }))
      .toEqual('is not 22')
    })
    it('is one of', () => {
      expect(printIs({ one: true, of: [2, 24] }))
      .toEqual('is one of [2,24]')
    })
    it('is not one of', () => {
      expect(printIs({ not: true, one: true, of: [2, 24] }))
      .toEqual('is not one of [2,24]')
    })
  })
  describe('Functions', () => {
    it('it returns true', () => {
      expect(printIs({ true: foo }))
      .toEqual('returns true to the function foo')
    })

    it('it returns not true', () => {
      expect(printIs({ not: true, true: foo }))
      .toEqual('returns not true to the function foo')
    })

    it('it satisfies assertion', () => {
      expect(printIs({ valid: foo }))
      .toEqual('satisfies assertion foo')
    })

    it('it satisfies not assertion', () => {
      expect(printIs({ not: true, valid: foo }))
      .toEqual('satisfies not assertion foo')
    })
  })
})
