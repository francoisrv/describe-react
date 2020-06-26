import ReactTestRender from 'react-test-renderer'
import findElements, { FindElementProps } from './findElements'
import { findAllNodes } from './utils'
import React from 'react'
import { Is } from './components/Is'

function makeTest(
  props: FindElementProps,
  elem: React.ReactElement<any>,
  length: number
) {
  it(JSON.stringify(props), () => {
    const test = ReactTestRender.create(elem)
    const elements = findElements(
      props,
      findAllNodes(test.root)
    )
    console.log(elements.map(e => e.type))
    expect(elements).toHaveLength(length)
    test.unmount()
  })
}

describe('Find elements', () => {
  describe('Find elements by type', () => {
    // makeTest(
    //   { type: 'div' },
    //   (
    //     <section>
    //       <div />
    //       <div />
    //       <div />
    //     </section>
    //   ),
    //   3
    // )
    makeTest(
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
    // makeTest(
    //   { type: <Is not="span" /> },
    //   (
    //     <section>
    //       <div />
    //       <div />
    //       <div />
    //     </section>
    //   ),
    //   3
    // )
  })
})