import React from 'react'
import ReactTestRenderer from 'react-test-renderer'
import { hasProperties, PropertiesDescriber } from '../..'

function hasPropertiesSpec(
  label: string,
  context: React.ReactElement<any>,
  describer: PropertiesDescriber,
) {
  it(label, () => {
    const elem = ReactTestRenderer.create(context)
    hasProperties(elem.root, describer)
    
  })
}

function hasPropertiesSpecFail(
  label: string,
  context: React.ReactElement<any>,
  describer: any,
) {
  it(`SHOULD FAIL: ${ label }`, () => {
    const elem = ReactTestRenderer.create(context)
    try {
      hasProperties(elem.root, describer)
      throw new Error('Should have failed')
    } catch (error) {
      expect(error.message).not.toEqual('Should have failed')
    }
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

  hasPropertiesSpecFail(
    'true for any',
    <div />,
    true
  )

  hasPropertiesSpec(
    'false for none',
    <div />,
    false
  )

  hasPropertiesSpecFail(
    'false for none',
    <div id="foo" />,
    false
  )

  hasPropertiesSpec(
    'by name only using string',
    <div id="foo" className="bar" />,
    [
      { name: 'id' }
    ]
  )

  hasPropertiesSpecFail(
    'by name only using string',
    <div id="foo" className="bar" />,
    [
      { name: 'foo' }
    ]
  )

  hasPropertiesSpec(
    'by name only using regex',
    <div id="foo" className="bar" />,
    [
      { name: /id/ }
    ]
  )

  hasPropertiesSpecFail(
    'by name only using regex',
    <div id="foo" className="bar" />,
    [
      { name: /foo/ }
    ]
  )

  hasPropertiesSpec(
    'by string name and value',
    <div id="foo" className="bar" />,
    [
      { name: 'id', value: 'foo' }
    ]
  )

  hasPropertiesSpecFail(
    'by string name and value',
    <div id="foo" className="bar" />,
    [
      { name: 'id', value: 'foo2' }
    ]
  )

  hasPropertiesSpec(
    'by value',
    <div id="foo" className="bar" />,
    [
      { value: 'foo' }
    ]
  )

  hasPropertiesSpecFail(
    'by value',
    <div id="foo" className="bar" />,
    [
      { value: 'foo2' }
    ]
  )
})
