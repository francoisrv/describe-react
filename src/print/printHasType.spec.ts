import printHasType from "./printHasType"
import { printHighlight, printLogicOperator } from "./common"
import Expect from "../components/Expect"
import { Dictionary } from "lodash"
import { TypeIdentifier } from "../types"
import Describe from "../components/Describe"

type Print =
| string
| { highlight: string }
| { operator: string }

interface Test {
  expectation: string
  printed: Print[]
  identifier: TypeIdentifier
}

const tests: Dictionary<Test[]> = {
  to: [
    {
      expectation: 'toHaveType="div"',
      identifier: 'div',
      printed: [
        'to have type which is < ',
        { highlight: 'div' },
        ' >'
      ]
    },
    {
      expectation: 'toHaveType={ Describe }',
      identifier: Describe,
      printed: [
        'to have type which is component < ',
        { highlight: 'Describe' },
        ' >'
      ]
    }
  ],
  not: [
    {
      expectation: 'noToHaveType="div"',
      identifier: 'div',
      printed: [
        { operator: 'not' },
        ' to have type which is < ',
        { highlight: 'div' },
        ' >'
      ]
    },
    {
      expectation: 'notToHaveType={ Describe }',
      identifier: Describe,
      printed: [
        { operator: 'not' },
        ' to have type which is component < ',
        { highlight: 'Describe' },
        ' >'
      ]
    }
  ]
}

function printTest(p: Print) {
  if (typeof p === 'string') {
    return p
  }
  if ('highlight' in p) {
    return printHighlight(p.highlight)
  }
  if ('operator' in p) {
    return printLogicOperator(p.operator)
  }
}

describe('Print To Have Type', () => {
  describe('To have type', () => {
    for (const { expectation, printed, identifier } of tests.to) {
      describe(expectation, () => {
        const expected: string[] = printed.map(printTest)
        it(expected.join(''), () => {
          expect(printHasType(identifier))
          .toEqual(expected.join(''))
        })
      })
    }
  })

  describe('Not to have type', () => {
    for (const { expectation, printed, identifier } of tests.not) {
      describe(expectation, () => {
        const expected: string[] = printed.map(printTest)
        it(expected.join(''), () => {
          expect(printHasType(identifier, true))
          .toEqual(expected.join(''))
        })
      })
    }
  })
})