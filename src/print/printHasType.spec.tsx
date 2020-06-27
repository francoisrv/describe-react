import printHasType from "./printHasType"
import { printHighlight, printLogicOperator } from "./common"
import Expect from "../components/Expect"
import { Dictionary } from "lodash"
import { TypeIdentifier } from "../types"
import Describe from "../components/Describe"
import React from "react"
import { Is } from "../components/Is"
import ReactTestRender from 'react-test-renderer'

type Print =
| string
| { highlight: string }
| { operator: string }

interface Test {
  expectation: string
  printed: Print[]
  identifier: TypeIdentifier
}

function isDivIfNoChild(type: string, elem: ReactTestRender.ReactTestInstance) {
  return elem.children.length === 0 && type === 'div'
}

const tests: Dictionary<Test[]> = {
  to: [
    {
      expectation: 'toHaveType="div"',
      identifier: 'div',
      printed: [
        'to have type which is ',
        { highlight: 'div' },
      ]
    },
    {
      expectation: 'toHaveType={ Describe }',
      identifier: Describe,
      printed: [
        'to have type which is component ',
        { highlight: 'Describe' },
      ]
    },
    {
      expectation: 'toHaveType={ <Is not="div" /> }',
      identifier: <Is not="div" />,
      printed: [
        'to have type which is not ',
        { highlight: 'div' },
      ]
    },
    {
      expectation: 'toHaveType={ <Is one of={[ "div", Describe ]} /> }',
      identifier: <Is one of={[ 'div', Describe ]} />,
      printed: [
        'to have type which is one of ',
        { highlight: 'div' },
        { operator: ' or ' },
        '',
        { highlight: 'Describe' },
      ]
    },
    {
      expectation: 'toHaveType={ <Is not one of={[ "div", Describe ]} /> }',
      identifier: <Is not one of={[ 'div', Describe ]} />,
      printed: [
        'to have type which is not one of ',
        { highlight: 'div' },
        { operator: ' nor ' },
        '',
        { highlight: 'Describe' },
      ]
    },
    {
      expectation: 'toHaveType={ <Is true={ isDivIfNoChild } /> }',
      identifier: <Is true={ isDivIfNoChild } />,
      printed: [
        'to have type which returns true to the function ',
        { highlight: 'isDivIfNoChild' },
      ]
    },
  ],
  not: [
    {
      expectation: 'noToHaveType="div"',
      identifier: 'div',
      printed: [
        { operator: 'not' },
        ' to have type which is ',
        { highlight: 'div' },
      ]
    },
    {
      expectation: 'notToHaveType={ Describe }',
      identifier: Describe,
      printed: [
        { operator: 'not' },
        ' to have type which is component ',
        { highlight: 'Describe' },
      ]
    },
    {
      expectation: 'notToHaveType={ <Is not="div" /> }',
      identifier: <Is not="div" />,
      printed: [
        { operator: 'not' },
        ' to have type which is not ',
        { highlight: 'div' },
      ]
    },
    {
      expectation: 'noToHaveType={ <Is one of={[ "div", Describe ]} /> }',
      identifier: <Is one of={[ 'div', Describe ]} />,
      printed: [
        { operator: 'not' },
        ' to have type which is one of ',
        { highlight: 'div' },
        { operator: ' or ' },
        '',
        { highlight: 'Describe' },
      ]
    },
    {
      expectation: 'notToHaveType={ <Is not one of={[ "div", Describe ]} /> }',
      identifier: <Is not one of={[ 'div', Describe ]} />,
      printed: [
        { operator: 'not' },
        ' to have type which is not one of ',
        { highlight: 'div' },
        { operator: ' nor ' },
        '',
        { highlight: 'Describe' },
      ]
    },
    {
      expectation: 'notToHaveType={ <Is true={ isDivIfNoChild } /> }',
      identifier: <Is true={ isDivIfNoChild } />,
      printed: [
        { operator: 'not' },
        ' to have type which returns true to the function ',
        { highlight: 'isDivIfNoChild' },
      ]
    },
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
