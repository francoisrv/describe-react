import React from 'react'
import ReactTestRenderer from 'react-test-renderer'

import { PropertyDescriber, hasProperty, isNot, isOneOf, isNotOneOf, expectPropertyValue } from '../..'

function foo() {

}

function hasPropertySpec(
  label: string,
  context: React.ReactElement<any>,
  describer: PropertyDescriber
) {
  it(label, () => {
    const elem = ReactTestRenderer.create(context)
    const has = hasProperty(elem.root, describer)
    expect(has).toBe(true)
  })
}

describe('Lib / Describers / Has property', () => {
  hasPropertySpec(
    'describe as string',
    <div id="foo" />,
    'id'
  )

  hasPropertySpec(
    'describe as regex',
    <div id="foo" />,
    /id/
  )

  hasPropertySpec(
    'describe as not string',
    <div id="foo" />,
    isNot('foo')
  )

  hasPropertySpec(
    'describe as not regex',
    <div id="foo" />,
    isNot(/idew/)
  )

  hasPropertySpec(
    'describe as one of string',
    <div id="foo" />,
    isOneOf('foo', 'id')
  )

  hasPropertySpec(
    'describe as one of regex',
    <div id="foo" />,
    isOneOf('foo', /id/)
  )

  hasPropertySpec(
    'describe as not one of string',
    <div id="foo" />,
    isNotOneOf('foo', 'bar')
  )

  hasPropertySpec(
    'describe as not one of regex',
    <div id="foo" />,
    isNotOneOf(/foo/, /bar/)
  )

  hasPropertySpec(
    'describe as plain object with string',
    <div id="foo" />,
    { name: 'id', value: 'foo' }
  )

  hasPropertySpec(
    'describe as is not plain object with string',
    <div id="foo" />,
    isNot({ name: 'id', value: 'foo22' })
  )

  hasPropertySpec(
    'describe as is one of plain object with string',
    <div id="foo" />,
    isOneOf(
      { name: 'id', value: 'foo' },
      { name: 'id', value: 'foo22' },
    )
  )

  hasPropertySpec(
    'describe as plain object with regex',
    <div id="foo" />,
    { name: /id/, value: 'foo' }
  )

  hasPropertySpec(
    'describe as plain object with only value',
    <div id="foo" />,
    { value: 'foo' }
  )

  hasPropertySpec(
    'describe as plain object with string and value function',
    <div id="foo" />,
    { name: 'id', value: expectPropertyValue(v => v === 'foo') }
  )

  hasPropertySpec(
    'describe as plain object with string and value function with props',
    <div id="foo" tabIndex={ 7 } />,
    { name: 'id', value: expectPropertyValue((v, props) => v === 'foo' && props.tabIndex === 7) }
  )

  hasPropertySpec(
    'describe as plain object with regex and value function',
    <div id="foo" />,
    { name: /id/, value: expectPropertyValue(v => v === 'foo') }
  )

  hasPropertySpec(
    'describe as plain object with regex and value function with props',
    <div id="foo" tabIndex={ 7 } />,
    { name: /id/, value: expectPropertyValue((v, props) => v === 'foo' && props.tabIndex === 7) }
  )

  hasPropertySpec(
    'describe as plain object with only value function',
    <div id="foo" />,
    { value: expectPropertyValue(v => v === 'foo') }
  )
})