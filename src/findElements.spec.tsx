import ReactTestRender from 'react-test-renderer'
import findElements, { FindElementProps } from './findElements'
import { findAllNodes } from './utils'
import React from 'react'
import { Is } from './components/Is'

function makeTest(
  label: string,
  props: FindElementProps,
  elem: React.ReactElement<any>,
  length: number
) {
  it(label, () => {
    const test = ReactTestRender.create(elem)
    const elements = findElements(
      props,
      findAllNodes(test.root)
    )
    // console.log(elements.map(e => e.type))
    expect(elements).toHaveLength(length)
    test.unmount()
  })
}

function isAChildlessSpan(type: string, elem: ReactTestRender.ReactTestInstance) {
  return type === 'span' && !elem.children.length
}

function assertIsAChildlessSpan(type: string, elem: ReactTestRender.ReactTestInstance) {
  expect(type).toEqual('span')
  expect(elem.children).toHaveLength(0)
}

describe('Find elements', () => {
  describe('Find elements by type', () => {
    makeTest(
      "{ type: 'div' },",
      { type: 'div' },
      (
        <section>
          <div />
          <div />
          <div />
        </section>
      ),
      3
    )
    makeTest(
      '{ type: Is }',
      { type: Is },
      (
        <section>
          <Is />
          <Is />
          <Is />
        </section>
      ),
      3
    )
    makeTest(
      '{ type: <Is not="span" /> }',
      { type: <Is not="span" /> },
      (
        <section>
          <div />
          <div />
          <div />
        </section>
      ),
      3
    )
    makeTest(
      "{ type: <Is one of={[ 'span', 'div' ]} /> }",
      { type: <Is one of={[ 'span', 'div' ]} /> },
      (
        <section>
          <div />
          <div />
          <div />
          <span />
        </section>
      ),
      4
    )
    makeTest(
      "{ type: <Is not one of={[ 'span', 'div' ]} /> }",
      { type: <Is not one of={[ 'span', 'div' ]} /> },
      (
        <section>
          <div />
          <div />
          <div />
          <span />
        </section>
      ),
      0
    )
    makeTest(
      '{ type: <Is true={ isAChildlessSpan } /> }',
      { type: <Is true={ isAChildlessSpan } /> },
      (
        <section>
          <div />
          <div />
          <div />
          <span />
          <span>
            <span>Hello</span>
          </span>
        </section>
      ),
      1
    )
    makeTest(
      '{ type: <Is not true={ isAChildlessSpan } /> }',
      { type: <Is not true={ isAChildlessSpan } /> },
      (
        <section>
          <span />
          <span>
            <span>Hello</span>
          </span>
        </section>
      ),
      2
    )
    makeTest(
      '{ type: <Is valid={ assertIsAChildlessSpan } /> }',
      { type: <Is valid={ assertIsAChildlessSpan } /> },
      (
        <section>
          <div />
          <div />
          <div />
          <span />
          <span>
            <span>Hello</span>
          </span>
        </section>
      ),
      1
    )

    makeTest(
      '{ type: <Is not valid={ assertIsAChildlessSpan } /> }',
      { type: <Is not valid={ assertIsAChildlessSpan } /> },
      (
        <section>
          <span />
          <span>
            <span>Hello</span>
          </span>
        </section>
      ),
      2
    )
  })
})
