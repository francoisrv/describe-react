import React from 'react'
import ReactTestRenderer from 'react-test-renderer'

import { TextDescriber } from '../..'
import expectElementText, { ExpectElementTextLabel } from './expectElementText'

function expectElementTextSpec(
  title: string,
  context: React.ReactElement<any>,
  label: ExpectElementTextLabel,
  describer: TextDescriber | TextDescriber[],
  failer: any
) {
  it(title, () => {
    const elem = ReactTestRenderer.create(context)
    expectElementText(elem.root, label as any, describer as any)
  })
  it(`SHOULD FAIL: ${ title }`, () => {
    const elem = ReactTestRenderer.create(context)
    try {
      expectElementText(elem.root, label as any, failer as any)
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
    'toHaveText',
    true,
    false
  )

  expectElementTextSpec(
    'true',
    <span />,
    'notToHaveText',
    true,
    false
  )

  expectElementTextSpec(
    'false',
    <span />,
    'toHaveText',
    false,
    true
  )
  
  expectElementTextSpec(
    'simple text',
    <span>Hello</span>,
    'toHaveText',
    'Hello',
    'foo'
  )

  expectElementTextSpec(
    'regex',
    <span>Hello</span>,
    'toHaveText',
    /hello/i,
    /hello/
  )
})
