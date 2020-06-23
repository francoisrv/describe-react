import React from 'react'
import ReactTestRenderer from 'react-test-renderer'

import { TextDescriber, hasType, isOneOf, isNot, isNotOneOf } from '../..'
import hasText from './hasText'

function Foo() {
  return <div />
}

function Bar() {
  return <div />
}

function hasTextSpec(
  label: string,
  context: React.ReactElement<any>,
  describer: TextDescriber,
  failer: any
) {
  it(label, () => {
    const elem = ReactTestRenderer.create(context)
    hasText(elem.root, describer)
  })
  it(`SHOULD FAIL: ${ label }`, () => {
    const elem = ReactTestRenderer.create(context)
    try {
      hasText(elem.root, failer)
      throw new Error('Should have failed')
    } catch (error) {
      expect(error.message).not.toEqual('Should have failed')
    }
  })
}

describe('Lib / Describers / Has Text', () => {
  hasTextSpec(
    'true',
    <span>Hello</span>,
    true,
    false
  )

  hasTextSpec(
    'false',
    <span />,
    false,
    true
  )
  
  hasTextSpec(
    'simple text',
    <span>Hello</span>,
    'Hello',
    'foo'
  )

  hasTextSpec(
    'regex',
    <span>Hello</span>,
    /hello/i,
    /hello/
  )
})
