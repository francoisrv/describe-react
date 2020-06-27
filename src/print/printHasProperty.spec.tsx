import { printHighlight, printLogicOperator } from "./common"
import { Dictionary } from "lodash"
import ReactTestRender from 'react-test-renderer'
import printHasProperty from "./printHasProperty"
import React from "react"
import { Is } from "../components/Is"
import { PropertyIdentifier } from "../types"

type Print =
| string
| { highlight: string }
| { operator: string }

interface Test {
  expectation: string
  printed: Print[]
  identifier: PropertyIdentifier
}

function isDivIfNoChild(type: string, elem: ReactTestRender.ReactTestInstance) {
  return elem.children.length === 0 && type === 'div'
}

const tests: Dictionary<Test[]> = {
  to: [
    {
      expectation: 'toHaveProperty',
      identifier: true,
      printed: [
        'to have properties',
      ]
    },
    {
      expectation: 'toHaveProperty=string',
      identifier: 'foo',
      printed: [
        'to have property with name ',
        { highlight: 'foo' }
      ]
    },
    {
      expectation: 'toHaveProperty=RegExp',
      identifier: /abc/ ,
      printed: [
        'to have property with name matching ',
        { highlight: '/abc/'  }
      ]
    },
    {
      expectation: 'toHaveProperty={ key: any }',
      identifier: { foo: 47 } ,
      printed: [
        'to have property with name ',
        { highlight: 'foo'  },
        ' which value equals ',
        { highlight: '47' }
      ]
    },
    {
      expectation: 'toHaveProperty={ ...key: any }',
      identifier: { foo: 47, bar: [1, 2, null, undefined] } ,
      printed: [
        'to have some properties with name ',
        { highlight: 'foo'  },
        ' which value equals ',
        { highlight: '47' },
        { operator: ' and ' },
        'with name ',
        { highlight: 'bar'  },
        ' which value equals ',
        { highlight: '[1, 2, null, undefined]' },
      ]
    },
    {
      expectation: 'toHaveProperty={ key: Is }',
      identifier: { foo: <Is equal to={ 47 } /> } ,
      printed: [
        'to have property with name ',
        { highlight: 'foo'  },
        ' which value is equal to ',
        { highlight: '47' }
      ]
    },
    {
      expectation: 'toHaveProperty={ ...key: Is }',
      identifier: { foo: <Is equal to={ 47 } />, bar: <Is not null /> } ,
      printed: [
        'to have some properties with name ',
        { highlight: 'foo'  },
        ' which value is equal to ',
        { highlight: '47' },
        { operator: ' and '},
        'with name ',
        { highlight: 'bar'  },
        ' which value is not null'
      ]
    },
  ],
  not: [
    {
      expectation: 'noToHaveProperty',
      identifier: true,
      printed: [
        { operator: 'not' },
        ' to have properties',
      ]
    },
    {
      expectation: 'noToHaveProperty=string',
      identifier: 'foo',
      printed: [
        { operator: 'not' },
        ' to have property with name ',
        { highlight: 'foo' }
      ]
    },
    {
      expectation: 'noToHaveProperty=RegExp',
      identifier: /abc/ ,
      printed: [
        { operator: 'not' },
        ' to have property with name matching ',
        { highlight: '/abc/'  }
      ]
    },
    {
      expectation: 'noToHaveProperty={ key: any }',
      identifier: { foo: 47 } ,
      printed: [
        { operator: 'not' },
        ' to have property with name ',
        { highlight: 'foo'  },
        ' which value equals ',
        { highlight: '47' }
      ]
    },
    {
      expectation: 'noToHaveProperty={ ...key: any }',
      identifier: { foo: 47, bar: [1, 2, null, undefined] } ,
      printed: [
        { operator: 'not' },
        ' to have some properties with name ',
        { highlight: 'foo'  },
        ' which value equals ',
        { highlight: '47' },
        { operator: ' and ' },
        'with name ',
        { highlight: 'bar'  },
        ' which value equals ',
        { highlight: '[1, 2, null, undefined]' },
      ]
    },
    {
      expectation: 'noToHaveProperty={ key: Is }',
      identifier: { foo: <Is equal to={ 47 } /> } ,
      printed: [
        { operator: 'not' },
        ' to have property with name ',
        { highlight: 'foo'  },
        ' which value is equal to ',
        { highlight: '47' }
      ]
    },
    {
      expectation: 'noToHaveProperty={ ...key: Is }',
      identifier: { foo: <Is equal to={ 47 } />, bar: <Is not null /> } ,
      printed: [
        { operator: 'not' },
        ' to have some properties with name ',
        { highlight: 'foo'  },
        ' which value is equal to ',
        { highlight: '47' },
        { operator: ' and '},
        'with name ',
        { highlight: 'bar'  },
        ' which value is not null'
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

describe('Print To Have Property', () => {
  describe('To have property', () => {
    for (const { expectation, printed, identifier } of tests.to) {
      describe(expectation, () => {
        const expected: string[] = printed.map(printTest)
        it(expected.join(''), () => {
          expect(printHasProperty(identifier))
          .toEqual(expected.join(''))
        })
      })
    }
  })

  describe('Not to have property', () => {
    for (const { expectation, printed, identifier } of tests.not) {
      describe(expectation, () => {
        const expected: string[] = printed.map(printTest)
        it(expected.join(''), () => {
          expect(printHasProperty(identifier, true))
          .toEqual(expected.join(''))
        })
      })
    }
  })
})
