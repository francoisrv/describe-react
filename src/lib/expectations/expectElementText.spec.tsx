import React from 'react'
import ReactTestRenderer from 'react-test-renderer'

import { TextDescriber } from '../..'
import expectElementText from './expectElementText'

function expectElementTextSpec(
  label: string,
  context: React.ReactElement<any>,
  describer: TextDescriber,
  failer: any
) {
  it(label, () => {
    const elem = ReactTestRenderer.create(context)
    expectElementText(elem.root, describer)
  })
  it(`SHOULD FAIL: ${ label }`, () => {
    const elem = ReactTestRenderer.create(context)
    try {
      expectElementText(elem.root, failer)
      throw new Error('Should have failed')
    } catch (error) {
      expect(error.message).not.toEqual('Should have failed')
    }
  })
}

describe('Lib / Describers / Has Text', () => {
  expectElementTextSpec(
    'true',
    <span>Hello</span>,
    true,
    false
  )

  expectElementTextSpec(
    'false',
    <span />,
    false,
    true
  )
  
  expectElementTextSpec(
    'simple text',
    <span>Hello</span>,
    'Hello',
    'foo'
  )

  expectElementTextSpec(
    'regex',
    <span>Hello</span>,
    /hello/i,
    /hello/
  )
})
