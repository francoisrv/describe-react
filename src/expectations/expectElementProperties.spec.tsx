import React from 'react'
import ReactTestRenderer from 'react-test-renderer'
import { PropertiesDescriber } from '../..'
import expectElementProperties from './expectElementProperties'

function expectElementPropertiesSpec(
  label: string,
  context: React.ReactElement<any>,
  describer: PropertiesDescriber,
) {
  it(label, () => {
    const elem = ReactTestRenderer.create(context)
    expectElementProperties(elem.root, describer)
    
  })
}

function expectElementPropertiesSpecFail(
  label: string,
  context: React.ReactElement<any>,
  describer: any,
) {
  it(`SHOULD FAIL: ${ label }`, () => {
    const elem = ReactTestRenderer.create(context)
    try {
      expectElementProperties(elem.root, describer)
      throw new Error('Should have failed')
    } catch (error) {
      expect(error.message).not.toEqual('Should have failed')
    }
  })
}

describe('Lib / Describers / Has property', () => {
  expectElementPropertiesSpec(
    'empty Arrray',
    <div id="foo" className="bar" />,
    []
  )

  expectElementPropertiesSpec(
    'true for any',
    <div id="foo" className="bar" />,
    true
  )

  expectElementPropertiesSpecFail(
    'true for any',
    <div />,
    true
  )

  expectElementPropertiesSpec(
    'false for none',
    <div />,
    false
  )

  expectElementPropertiesSpecFail(
    'false for none',
    <div id="foo" />,
    false
  )

  expectElementPropertiesSpec(
    'by name only using string',
    <div id="foo" className="bar" />,
    [
      { name: 'id' }
    ]
  )

  expectElementPropertiesSpecFail(
    'by name only using string',
    <div id="foo" className="bar" />,
    [
      { name: 'foo' }
    ]
  )

  expectElementPropertiesSpec(
    'by name only using regex',
    <div id="foo" className="bar" />,
    [
      { name: /id/ }
    ]
  )

  expectElementPropertiesSpecFail(
    'by name only using regex',
    <div id="foo" className="bar" />,
    [
      { name: /foo/ }
    ]
  )

  expectElementPropertiesSpec(
    'by string name and value',
    <div id="foo" className="bar" />,
    [
      { name: 'id', value: 'foo' }
    ]
  )

  expectElementPropertiesSpecFail(
    'by string name and value',
    <div id="foo" className="bar" />,
    [
      { name: 'id', value: 'foo2' }
    ]
  )

  expectElementPropertiesSpec(
    'by value',
    <div id="foo" className="bar" />,
    [
      { value: 'foo' }
    ]
  )

  expectElementPropertiesSpecFail(
    'by value',
    <div id="foo" className="bar" />,
    [
      { value: 'foo2' }
    ]
  )
})
