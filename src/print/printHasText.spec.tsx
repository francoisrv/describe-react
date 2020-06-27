import React from 'react'
import ReactTestRender from 'react-test-renderer'

import { printHighlight, printLogicOperator } from './common'
import { Dictionary } from 'lodash'
import { TextIdentifier } from '../types'
import { Is } from '../components/Is'
import printHasText from './printHasText'

type Print =
| string
| { highlight: string }
| { operator: string }

interface Test {
  expectation: string
  printed: Print[]
  identifier: TextIdentifier
}

function isText(text: string, elem: ReactTestRender.ReactTestInstance) {
  if (elem.props.disabled) {
    return text === 'off'
  }
  return text === 'on'
}

function validate() {
  
}

const tests: Dictionary<Test[]> = {
  to: [
    {
      expectation: 'toHaveText',
      identifier: true,
      printed: [
        'to have text'
      ]
    },
    {
      expectation: 'toHaveText={ false }',
      identifier: false,
      printed: [
        { operator: 'not' },
        ' to have text'
      ]
    },
    {
      expectation: 'toHaveText="abc"',
      identifier: 'abc',
      printed: [
        'to have text which equals ',
        { highlight: 'abc' }
      ]
    },
    {
      expectation: 'toHaveText={ /abc/ }',
      identifier: /abc/,
      printed: [
        'to have text which matches ',
        { highlight: '/abc/' }
      ]
    },
    {
      expectation: 'toHaveText={ <Is not="abc" /> }',
      identifier: <Is not="abc" />,
      printed: [
        'to have text which is not ',
        { highlight: 'abc' }
      ]
    },
    {
      expectation: "toHaveText={ <Is one of={[ 'hello', 'goodbye' ]} /> }",
      identifier: <Is one of={[ 'hello', 'goodbye' ]} />,
      printed: [
        'to have text which is one of ',
        { highlight: 'hello' },
        { operator: ' or ' },
        { highlight: 'goodbye' }
      ]
    },
    {
      expectation: "toHaveText={ <Is not one of={[ 'hello', 'goodbye' ]} /> }",
      identifier: <Is not one of={[ 'hello', 'goodbye' ]} />,
      printed: [
        'to have text which is not one of ',
        { highlight: 'hello' },
        { operator: ' nor ' },
        { highlight: 'goodbye' }
      ]
    },
    {
      expectation: "toHaveText={ <Is true={ isText } /> }",
      identifier: <Is true={ isText } />,
      printed: [
        'to have text which returns true to the function ',
        { highlight: 'isText' },
      ]
    },
    {
      expectation: "toHaveText={ <Is not true={ isText } /> }",
      identifier: <Is not true={ isText } />,
      printed: [
        'to have text which does not return true to the function ',
        { highlight: 'isText' },
      ]
    },
    {
      expectation: "toHaveText={ <Is valid={ validate } /> }",
      identifier: <Is valid={ validate } />,
      printed: [
        'to have text which satisfies the assertion ',
        { highlight: 'validate' },
      ]
    },
    {
      expectation: "toHaveText={ <Is not valid={ validate } /> }",
      identifier: <Is not valid={ validate } />,
      printed: [
        'to have text which does not satisfy the assertion ',
        { highlight: 'validate' },
      ]
    },
    {
      expectation: "toHaveText={ <Is one of={[ 'foo', <Is not=\"bar\" /> ]} /> }",
      identifier: <Is one of={[ 'foo', <Is not="bar" /> ]} />,
      printed: [
        'to have text which is one of ',
        { highlight: 'foo' },
        { operator: ' or ' },
        { highlight: `is not ${ printHighlight('bar') }` }
      ]
    },
  ],
  not: [
    {
      expectation: 'notToHaveText',
      identifier: true,
      printed: [
        { operator: 'not' },
        ' to have text'
      ]
    },
    {
      expectation: 'notToHaveText={ false }',
      identifier: false,
      printed: [
        'to have text'
      ]
    },
    {
      expectation: 'notToHaveText="abc"',
      identifier: 'abc',
      printed: [
        { operator: 'not' },
        ' to have text which equals ',
        { highlight: 'abc' }
      ]
    },
    {
      expectation: 'notToHaveText={ /abc/ }',
      identifier: /abc/,
      printed: [
        { operator: 'not' },
        ' to have text which matches ',
        { highlight: '/abc/' }
      ]
    },
    {
      expectation: "notToHaveText={ <Is one of={[ 'hello', 'goodbye' ]} /> }",
      identifier: <Is one of={[ 'hello', 'goodbye' ]} />,
      printed: [
        { operator: 'not' },
        ' to have text which is one of ',
        { highlight: 'hello' },
        { operator: ' or ' },
        { highlight: 'goodbye' }
      ]
    },
    {
      expectation: "notToHaveText={ <Is not one of={[ 'hello', 'goodbye' ]} /> }",
      identifier: <Is not one of={[ 'hello', 'goodbye' ]} />,
      printed: [
        { operator: 'not' },
        ' to have text which is not one of ',
        { highlight: 'hello' },
        { operator: ' nor ' },
        { highlight: 'goodbye' }
      ]
    },
    {
      expectation: "notToHaveText={ <Is true={ isText } /> }",
      identifier: <Is true={ isText } />,
      printed: [
        { operator: 'not' },
        ' to have text which returns true to the function ',
        { highlight: 'isText' },
      ]
    },
    {
      expectation: "notToHaveText={ <Is valid={ validate } /> }",
      identifier: <Is valid={ validate } />,
      printed: [
        { operator: 'not' },
        ' to have text which satisfies the assertion ',
        { highlight: 'validate' },
      ]
    },
    {
      expectation: "notToHaveText={ <Is not valid={ validate } /> }",
      identifier: <Is not valid={ validate } />,
      printed: [
        { operator: 'not' },
        ' to have text which does not satisfy the assertion ',
        { highlight: 'validate' },
      ]
    },
    {
      expectation: "notToHaveText={ <Is one of={[ 'foo', <Is not=\"bar\" /> ]} /> }",
      identifier: <Is one of={[ 'foo', <Is not="bar" /> ]} />,
      printed: [
        { operator: 'not' },
        ' to have text which is one of ',
        { highlight: 'foo' },
        { operator: ' or ' },
        { highlight: `is not ${ printHighlight('bar') }` }
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

describe('Print To Have Text', () => {
  describe('To have text', () => {
    for (const { expectation, printed, identifier } of tests.to) {
      describe(expectation, () => {
        const expected: string[] = printed.map(printTest)
        it(expected.join(''), () => {
          expect(printHasText(identifier))
          .toEqual(expected.join(''))
        })
      })
    }
  })

  describe('Not to have text', () => {
    for (const { expectation, printed, identifier } of tests.not) {
      describe(expectation, () => {
        const expected: string[] = printed.map(printTest)
        it(expected.join(''), () => {
          expect(printHasText(identifier, true))
          .toEqual(expected.join(''))
        })
      })
    }
  })
})
