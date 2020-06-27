import ReactTestRender from 'react-test-renderer'
import hasType from './hasType'
import React from 'react'
import DescribeReactError from '../DescribeReactError'
import { Is } from '../components/Is'
import { TextIdentifier } from '../types'
import { printElement } from '../print/common'
import hasText from './hasText'

function makeTest(
  label: string,
  elem: React.ReactElement<any>,
  ok: TextIdentifier,
  ko: any
) {
  describe(`${ printElement(elem) } | ${ label }`, () => {
    it('should pass', () => {
      hasText(
        ReactTestRender.create(elem).root,
        ok
      )
    })
    it('should fail', () => {
      let failed = false
      try {
        hasText(
          ReactTestRender.create(elem).root,
          ko
        )
      } catch (error) {
        if (!(error instanceof DescribeReactError)) {
          console.log(error)
          throw new Error(`Was expecting a DescribeReactError but instead got ${ error.name }`)
        } 
        failed = true
      }
      expect(failed).toBe(true)
    })
  })
}

const isTrue = (
  text: string,
  elem: ReactTestRender.ReactTestInstance
) => {
  return text === 'Hello' && elem.type !== 'table'
}
const isNotTrue = (
  text: string,
  elem: ReactTestRender.ReactTestInstance
) => {
  return text !== 'Hello' && elem.type === 'table'
}
const isValid = (
  text: string,
  elem: ReactTestRender.ReactTestInstance
) => {
  expect(isTrue(text, elem)).toBe(true)
}
const isNotValid = (
  text: string,
  elem: ReactTestRender.ReactTestInstance
) => {
  expect(isTrue(text, elem)).toBe(false)
}

describe('Has text', () => {
  makeTest(
    'has text',
    <div>Hello</div>,
    true,
    false
  )
  makeTest(
    'has no text',
    <div />,
    false,
    true
  )
  makeTest(
    'has text Hello',
    <div>Hello</div>,
    'Hello',
    'hello'
  )
  makeTest(
    'matches text',
    <div>Hello</div>,
    /hello/i,
    /hello/
  )
  makeTest(
    'text is one of',
    <div>Hello</div>,
    <Is one of={[ 'Hello', 'bye' ]} />,
    <Is one of={[ 'hello', 'bye' ]} />
  )
  makeTest(
    'text is not one of',
    <div>Hello</div>,
    <Is not one of={[ 'hello', 'bye' ]} />,
    <Is not one of={[ 'Hello', 'bye' ]} />
  )
  makeTest(
    'text is true',
    <div>Hello</div>,
    <Is true={ isTrue } />,
    <Is true={ isNotTrue } />
  )
  makeTest(
    'text is not true',
    <div>Hello</div>,
    <Is not true={ isNotTrue } />,
    <Is not true={ isTrue } />
  )
  makeTest(
    'text is valid',
    <div>Hello</div>,
    <Is valid={ isValid } />,
    <Is valid={ isNotValid } />
  )
  makeTest(
    'text is not valid',
    <div>Hello</div>,
    <Is not valid={ isNotValid } />,
    <Is not valid={ isValid } />
  )
  makeTest(
    'text is not',
    <div>Hello</div>,
    <Is not="hello" />,
    <Is not="Hello" />,
  )
  makeTest(
    'text is one of is',
    <div>Hello</div>,
    <Is one of={[ <Is not="hello" /> ]} />,
    <Is one of={[ <Is not="Hello" /> ]} />,
  )
})
