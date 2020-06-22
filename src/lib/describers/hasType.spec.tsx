import React from 'react'
import ReactTestRenderer from 'react-test-renderer'

import { TypeDescriber, hasType, isOneOf, isNot, isNotOneOf } from '../..'

function Foo() {
  return <div />
}

function Bar() {
  return <div />
}

function hasTypeSpec(
  label: string,
  context: React.ReactElement<any>,
  describer: TypeDescriber
) {
  it(label, () => {
    const elem = ReactTestRenderer.create(context)
    const has = hasType(elem.root, describer)
    expect(has).toBe(true)
  })
}

describe('Lib / Describers / Has Type', () => {
  hasTypeSpec(
    'describe as string',
    <span />,
    'span'
  )

  hasTypeSpec(
    'describe as component',
    <Foo />,
    Foo
  )

  hasTypeSpec(
    'describe as one of',
    <Foo />,
    isOneOf(Foo, Bar, 'span')
  )

  hasTypeSpec(
    'describe as not',
    <Foo />,
    isNot(Bar)
  )

  hasTypeSpec(
    'describe as not one of',
    <Foo />,
    isNotOneOf(Bar, 'span')
  )
})