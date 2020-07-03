import { printProps, printGeneric } from "../print"
import { predicate } from "../utils"
import { IsProps } from "../components/Is"
import is from "./is"

const T = true

describe('is', () => {
  interface Test {
    value: any
    is: IsProps<any>
    expected: boolean
  }
  function makeTest(t: Test, i: number) {
    it(`#${ i } - ${ printGeneric(t.value) } is ${ printProps(t.is) } should ${ t.expected ? 'pass' : 'fail' }`, () => {
      expect(predicate(() => is(t.value, t.is))).toBe(t.expected)
    })
  }
  describe('true', () => {
    const tests: Test[] = [
      {
        value: true,
        is: { true: T },
        expected: true
      },
      {
        value: false,
        is: { true: T },
        expected: false
      },
      {
        value: false,
        is: { not: T, true: T },
        expected: true
      },
      {
        value: true,
        is: { not: T, true: T },
        expected: false
      },
    ]
    tests.forEach(makeTest)
  })
  describe('false', () => {
    const tests: Test[] = [
      {
        value: false,
        is: { false: T },
        expected: true
      },
      {
        value: true,
        is: { false: T },
        expected: false
      },
      {
        value: true,
        is: { not: T, false: T },
        expected: true
      },
      {
        value: false,
        is: { not: T, false: T },
        expected: false
      },
    ]
    tests.forEach(makeTest)
  })
  describe('null', () => {
    const tests: Test[] = [
      {
        value: null,
        is: { null: T },
        expected: true
      },
      {
        value: undefined,
        is: { null: T },
        expected: false
      },
      {
        value: false,
        is: { not: T, null: T },
        expected: true
      },
      {
        value: null,
        is: { not: T, null: T },
        expected: false
      },
    ]
    tests.forEach(makeTest)
  })
  describe('undefined', () => {
    const tests: Test[] = [
      {
        value: undefined,
        is: { undefined: T },
        expected: true
      },
      {
        value: null,
        is: { undefined: T },
        expected: false
      },
      {
        value: false,
        is: { not: T, undefined: T },
        expected: true
      },
      {
        value: undefined,
        is: { not: T, undefined: T },
        expected: false
      },
    ]
    tests.forEach(makeTest)
  })
  describe('boolean', () => {
    const tests: Test[] = [
      {
        value: true,
        is: { boolean: T },
        expected: true
      },
      {
        value: null,
        is: { boolean: T },
        expected: false
      },
      {
        value: null,
        is: { not: T, boolean: T },
        expected: true
      },
      {
        value: false,
        is: { not: T, boolean: T },
        expected: false
      },

      {
        value: true,
        is: { a: T, boolean: T },
        expected: true
      },
      {
        value: null,
        is: { a: T, boolean: T },
        expected: false
      },
      {
        value: null,
        is: { not: T, a: T, boolean: T },
        expected: true
      },
      {
        value: false,
        is: { not: T, a: T, boolean: T },
        expected: false
      },
    ]
    tests.forEach(makeTest)
  })
  describe('number', () => {
    const tests: Test[] = [
      {
        value: 1,
        is: { number: T },
        expected: true
      },
      {
        value: null,
        is: { number: T },
        expected: false
      },
      {
        value: null,
        is: { not: T, number: T },
        expected: true
      },
      {
        value: 1,
        is: { not: T, number: T },
        expected: false
      },

      {
        value: 1,
        is: { a: T, number: T },
        expected: true
      },
      {
        value: null,
        is: { a: T, number: T },
        expected: false
      },
      {
        value: null,
        is: { not: T, a: T, number: T },
        expected: true
      },
      {
        value: 1,
        is: { not: T, a: T, number: T },
        expected: false
      },
    ]
    tests.forEach(makeTest)
  })
  describe('string', () => {
    const tests: Test[] = [
      {
        value: '1',
        is: { string: T },
        expected: true
      },
      {
        value: null,
        is: { string: T },
        expected: false
      },
      {
        value: null,
        is: { not: T, string: T },
        expected: true
      },
      {
        value: '1',
        is: { not: T, string: T },
        expected: false
      },

      {
        value: '1',
        is: { a: T, string: T },
        expected: true
      },
      {
        value: null,
        is: { a: T, string: T },
        expected: false
      },
      {
        value: null,
        is: { not: T, a: T, string: T },
        expected: true
      },
      {
        value: '1',
        is: { not: T, a: T, string: T },
        expected: false
      },
    ]
    tests.forEach(makeTest)
  })
  describe('object', () => {
    const tests: Test[] = [
      {
        value: {},
        is: { object: T },
        expected: true
      },
      {
        value: 'null',
        is: { object: T },
        expected: false
      },
      {
        value: 123,
        is: { not: T, object: T },
        expected: true
      },
      {
        value: {},
        is: { not: T, object: T },
        expected: false
      },

      {
        value: {},
        is: { an: T, object: T },
        expected: true
      },
      {
        value: 123,
        is: { an: T, object: T },
        expected: false
      },
      {
        value: 123,
        is: { not: T, an: T, object: T },
        expected: true
      },
      {
        value: {},
        is: { not: T, an: T, object: T },
        expected: false
      },
    ]
    tests.forEach(makeTest)
  })
  describe('array', () => {
    const tests: Test[] = [
      {
        value: [],
        is: { array: T },
        expected: true
      },
      {
        value: 'null',
        is: { array: T },
        expected: false
      },
      {
        value: null,
        is: { not: T, array: T },
        expected: true
      },
      {
        value: [],
        is: { not: T, array: T },
        expected: false
      },

      {
        value: [],
        is: { an: T, array: T },
        expected: true
      },
      {
        value: null,
        is: { an: T, array: T },
        expected: false
      },
      {
        value: null,
        is: { not: T, an: T, array: T },
        expected: true
      },
      {
        value: [],
        is: { not: T, an: T, array: T },
        expected: false
      },
    ]
    tests.forEach(makeTest)
  })
  describe('error', () => {
    const tests: Test[] = [
      {
        value: new Error,
        is: { error: T },
        expected: true
      },
      {
        value: 'null',
        is: { error: T },
        expected: false
      },
      {
        value: null,
        is: { not: T, error: T },
        expected: true
      },
      {
        value: new Error,
        is: { not: T, error: T },
        expected: false
      },

      {
        value: new Error,
        is: { an: T, error: T },
        expected: true
      },
      {
        value: null,
        is: { an: T, error: T },
        expected: false
      },
      {
        value: null,
        is: { not: T, an: T, error: T },
        expected: true
      },
      {
        value: new Error,
        is: { not: T, an: T, error: T },
        expected: false
      },
    ]
    tests.forEach(makeTest)
  })
  describe('date', () => {
    const tests: Test[] = [
      {
        value: new Date(),
        is: { date: T },
        expected: true
      },
      {
        value: null,
        is: { date: T },
        expected: false
      },
      {
        value: null,
        is: { not: T, date: T },
        expected: true
      },
      {
        value: new Date(),
        is: { not: T, date: T },
        expected: false
      },

      {
        value: new Date(),
        is: { a: T, date: T },
        expected: true
      },
      {
        value: null,
        is: { a: T, date: T },
        expected: false
      },
      {
        value: null,
        is: { not: T, a: T, date: T },
        expected: true
      },
      {
        value: new Date(),
        is: { not: T, a: T, date: T },
        expected: false
      },
    ]
    tests.forEach(makeTest)
  })
  describe('empty', () => {
    const tests: Test[] = [
      {
        value: '',
        is: { empty: T },
        expected: true
      },
      {
        value: 'null',
        is: { empty: T },
        expected: false
      },
      {
        value: [1],
        is: { not: T, empty: T },
        expected: true
      },
      {
        value: [],
        is: { not: T, empty: T },
        expected: false
      },
    ]
    tests.forEach(makeTest)
  })
})
