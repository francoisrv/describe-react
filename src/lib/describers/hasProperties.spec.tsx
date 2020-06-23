import React from 'react'
import ReactTestRenderer from 'react-test-renderer'
import { hasProperties, PropertiesDescriber } from '../..'

function hasPropertiesSpec(
  label: string,
  context: React.ReactElement<any>,
  describer: PropertiesDescriber
) {
  it(label, () => {
    const elem = ReactTestRenderer.create(context)
    const has = hasProperties(elem.root, describer)
    expect(has).toBe(true)
  })
}

describe('Lib / Describers / Has property', () => {
  hasPropertiesSpec(
    'empty Arrray',
    <div id="foo" className="bar" />,
    []
  )

  hasPropertiesSpec(
    'true for any',
    <div id="foo" className="bar" />,
    true
  )

  hasPropertiesSpec(
    'false for none',
    <div />,
    false
  )

  hasPropertiesSpec(
    'by name only',
    <div id="foo" className="bar" />,
    [
      { name: 'id' },
      { name: /class/ }
    ]
  )
})
