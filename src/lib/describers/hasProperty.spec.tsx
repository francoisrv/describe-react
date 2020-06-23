import React from 'react'
import ReactTestRenderer from 'react-test-renderer'

import { PropertyDescriber, hasProperty, isNot, isOneOf, isNotOneOf, expectPropertyValue } from '../..'

function hasPropertySpec(
  label: string,
  context: React.ReactElement<any>,
  describer: PropertyDescriber,
  failer: any
) {
  it(label, () => {
    const elem = ReactTestRenderer.create(context)
    hasProperty(elem.root, describer)
  })
  it(`SHOULD FAIL: ${ label }`, () => {
    const elem = ReactTestRenderer.create(context)
    try {
      hasProperty(elem.root, failer)
      throw new Error('Should have failed')
    } catch (error) {
      expect(error.message).not.toEqual('Should have failed')
    }
  })
}

describe('Lib / Describers / Has property', () => {
  hasPropertySpec(
    'string',
    <div id="foo" />,
    'id',
    'id2'
  )

  hasPropertySpec(
    'regex',
    <div id="foo" />,
    /id/,
    /id2/
  )

  hasPropertySpec(
    'not string',
    <div id="foo" />,
    isNot('foo'),
    isNot('id')
  )

  hasPropertySpec(
    'not regex',
    <div id="foo" />,
    isNot(/id2/),
    isNot(/id/)
  )

  hasPropertySpec(
    'one of string',
    <div id="foo" />,
    isOneOf('foo', 'id'),
    isOneOf('foo', 'bar')
  )

  hasPropertySpec(
    'one of regex',
    <div id="foo" />,
    isOneOf('foo', /id/),
    isOneOf('foo', /bar/)
  )

  hasPropertySpec(
    'not one of string',
    <div id="foo" />,
    isNotOneOf('foo', 'bar'),
    isNotOneOf('id', 'bar')
  )

  hasPropertySpec(
    'not one of regex',
    <div id="foo" />,
    isNotOneOf(/foo/, /bar/),
    isNotOneOf(/id/)
  )

  hasPropertySpec(
    'plain object with string and failing on name',
    <div id="foo" />,
    { name: 'id', value: 'foo' },
    { name: 'id2', value: 'foo' },
  )

  hasPropertySpec(
    'plain object with string and failing on value',
    <div id="foo" />,
    { name: 'id', value: 'foo' },
    { name: 'id', value: 'foo2' },
  )

  hasPropertySpec(
    'is not plain object with string',
    <div id="foo" />,
    isNot({ name: 'id', value: 'foo22' }),
    isNot({ name: 'id', value: 'foo' }),
  )

  hasPropertySpec(
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

  hasPropertySpec(
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

  hasPropertySpec(
    'plain object with regex and wrong name',
    <div id="foo" />,
    { name: /id/, value: 'foo' },
    { name: /id2/, value: 'foo' },
  )

  hasPropertySpec(
    'plain object with regex and wrong value',
    <div id="foo" />,
    { name: /id/, value: 'foo' },
    { name: /id/, value: 'foo2' },
  )

  hasPropertySpec(
    'plain object with only value',
    <div id="foo" />,
    { value: 'foo' },
    { value: 'foo2' },
  )

  hasPropertySpec(
    'plain object with string and value function',
    <div id="foo" />,
    { name: 'id', value: expectPropertyValue(v => v === 'foo') },
    { name: 'id', value: expectPropertyValue(v => v === 'foo2') },
  )

  hasPropertySpec(
    'plain object with string and value function with props',
    <div id="foo" tabIndex={ 7 } />,
    { name: 'id', value: expectPropertyValue((v, props) => v === 'foo' && props.tabIndex === 7) },
    { name: 'id', value: expectPropertyValue((v, props) => v === 'foo' && props.tabIndex === 9) },
  )

  hasPropertySpec(
    'plain object with regex and value function',
    <div id="foo" />,
    { name: /id/, value: expectPropertyValue(v => v === 'foo') },
    { name: /id/, value: expectPropertyValue(v => v === 'foo2') },
  )

  hasPropertySpec(
    'plain object with regex and value function with props',
    <div id="foo" tabIndex={ 7 } />,
    { name: /id/, value: expectPropertyValue((v, props) => v === 'foo' && props.tabIndex === 7) },
    { name: /id/, value: expectPropertyValue((v, props) => v === 'foo' && props.tabIndex === 9) },
  )

  hasPropertySpec(
    'plain object with only value function',
    <div id="foo" />,
    { value: expectPropertyValue(v => v === 'foo') },
    { value: expectPropertyValue(v => v === 'foo2') },
  )
})
