import ReactTestRenderer from 'react-test-renderer'
import React from 'react'
import expectElementNotToHaveType from './expectElementNotToHaveType'

function Foo() {
  return <span />
}

function Bar() {
  return <span />
}

describe('Expect element *NOT* to have type', () => {
  it('should work with string types', () => {
    const elem = ReactTestRenderer.create(<span />)
    expectElementNotToHaveType(elem.root, 'div')
  })
  it('should fail with unmatching string types', () => {
    const elem = ReactTestRenderer.create(<span />)
    let failed = false
    try {
      expectElementNotToHaveType(elem.root, 'span')
    } catch (error) {
      failed = true
    }
    expect(failed).toBe(true)
  })
  it('should work with component types', () => {
    const elem = ReactTestRenderer.create(<Foo />)
    expectElementNotToHaveType(elem.root, Bar)
  })
  it('should fail with unmatching component types', () => {
    const elem = ReactTestRenderer.create(<Foo />)
    let failed = false
    try {
      expectElementNotToHaveType(elem.root, Foo)
    } catch (error) {
      failed = true
    }
    expect(failed).toBe(true)
  })
})
