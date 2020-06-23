import React from 'react'
import ReactTestRenderer from 'react-test-renderer'

import { PropertyDescriber } from '../..'
import expectElementProperty from './expectElementProperty'
import { isNot } from '../entities/IsNot'
import { isOneOf } from '../entities/IsOneOf'
import { isNotOneOf } from '../entities/IsNotOneOf'
import { expectPropertyValue } from '../entities/ExpectPropertyValue'

function expectElementPropertySpec(
  label: string,
  context: React.ReactElement<any>,
  describer: PropertyDescriber,
  failer: any
) {
  it(label, () => {
    const elem = ReactTestRenderer.create(context)
    expectElementProperty(elem.root, describer)
  })
  it(`SHOULD FAIL: ${ label }`, () => {
    const elem = ReactTestRenderer.create(context)
    try {
      expectElementProperty(elem.root, failer)
      throw new Error('Should have failed')
    } catch (error) {
      expect(error.message).not.toEqual('Should have failed')
    }
  })
}

describe('Lib / Describers / Has property', () => {
  expectElementPropertySpec(
    'string',
    <div id="foo" />,
    'id',
    'id2'
  )

  expectElementPropertySpec(
    'regex',
    <div id="foo" />,
    /id/,
    /id2/
  )

  expectElementPropertySpec(
    'not string',
    <div id="foo" />,
    isNot('foo'),
    isNot('id')
  )

  expectElementPropertySpec(
    'not regex',
    <div id="foo" />,
    isNot(/id2/),
    isNot(/id/)
  )

  expectElementPropertySpec(
    'one of string',
    <div id="foo" />,
    isOneOf('foo', 'id'),
    isOneOf('foo', 'bar')
  )

  expectElementPropertySpec(
    'one of regex',
    <div id="foo" />,
    isOneOf('foo', /id/),
    isOneOf('foo', /bar/)
  )

  expectElementPropertySpec(
    'not one of string',
    <div id="foo" />,
    isNotOneOf('foo', 'bar'),
    isNotOneOf('id', 'bar')
  )

  expectElementPropertySpec(
    'not one of regex',
    <div id="foo" />,
    isNotOneOf(/foo/, /bar/),
    isNotOneOf(/id/)
  )

  expectElementPropertySpec(
    'plain object with string and failing on name',
    <div id="foo" />,
    { name: 'id', value: 'foo' },
    { name: 'id2', value: 'foo' },
  )

  expectElementPropertySpec(
    'plain object with string and failing on value',
    <div id="foo" />,
    { name: 'id', value: 'foo' },
    { name: 'id', value: 'foo2' },
  )

  expectElementPropertySpec(
    'is not plain object with string',
    <div id="foo" />,
    isNot({ name: 'id', value: 'foo22' }),
    isNot({ name: 'id', value: 'foo' }),
  )

  expectElementPropertySpec(
    'is one of plain object with string',
    <div id="foo" />,
    isOneOf(
      { name: 'id', value: 'foo' },
      { name: 'id', value: 'foo22' },
    ),
    isOneOf(
      { name: 'bar', value: 'foo' },
      { name: 'id', value: 'foo22' },
    )
  )

  expectElementPropertySpec(
    'is not one of plain object with string',
    <div id="foo" />,
    isNotOneOf(
      { name: 'id2', value: 'foo' },
      { name: 'id', value: 'foo22' },
    ),
    isNotOneOf(
      { name: 'id', value: 'foo' },
      { name: 'id', value: 'foo22' },
    )
  )

  expectElementPropertySpec(
    'plain object with regex and wrong name',
    <div id="foo" />,
    { name: /id/, value: 'foo' },
    { name: /id2/, value: 'foo' },
  )

  expectElementPropertySpec(
    'plain object with regex and wrong value',
    <div id="foo" />,
    { name: /id/, value: 'foo' },
    { name: /id/, value: 'foo2' },
  )

  expectElementPropertySpec(
    'plain object with only value',
    <div id="foo" />,
    { value: 'foo' },
    { value: 'foo2' },
  )

  expectElementPropertySpec(
    'plain object with string and value function',
    <div id="foo" />,
    { name: 'id', value: expectPropertyValue(v => v === 'foo') },
    { name: 'id', value: expectPropertyValue(v => v === 'foo2') },
  )

  expectElementPropertySpec(
    'plain object with string and value function with props',
    <div id="foo" tabIndex={ 7 } />,
    { name: 'id', value: expectPropertyValue((v, props) => v === 'foo' && props.tabIndex === 7) },
    { name: 'id', value: expectPropertyValue((v, props) => v === 'foo' && props.tabIndex === 9) },
  )

  expectElementPropertySpec(
    'plain object with regex and value function',
    <div id="foo" />,
    { name: /id/, value: expectPropertyValue(v => v === 'foo') },
    { name: /id/, value: expectPropertyValue(v => v === 'foo2') },
  )

  expectElementPropertySpec(
    'plain object with regex and value function with props',
    <div id="foo" tabIndex={ 7 } />,
    { name: /id/, value: expectPropertyValue((v, props) => v === 'foo' && props.tabIndex === 7) },
    { name: /id/, value: expectPropertyValue((v, props) => v === 'foo' && props.tabIndex === 9) },
  )

  expectElementPropertySpec(
    'plain object with only value function',
    <div id="foo" />,
    { value: expectPropertyValue(v => v === 'foo') },
    { value: expectPropertyValue(v => v === 'foo2') },
  )
})
