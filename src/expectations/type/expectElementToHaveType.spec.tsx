import ReactTestRenderer from 'react-test-renderer'
import React from 'react'
import expectElementToHaveType from './expectElementToHaveType'

function Foo() {
  return <span />
}

function Bar() {
  return <span />
}

describe('Expect element to have type', () => {
  it('should work with string types', () => {
    const elem = ReactTestRenderer.create(<span />)
    expectElementToHaveType(elem.root, 'span')
  })
  it('should fail with unmatching string types', () => {
    const elem = ReactTestRenderer.create(<span />)
    let failed = false
    try {
      expectElementToHaveType(elem.root, 'div')
    } catch (error) {
      failed = true
    }
    expect(failed).toBe(true)
  })
  it('should work with component types', () => {
    const elem = ReactTestRenderer.create(<Foo />)
    expectElementToHaveType(elem.root, Foo)
  })
  it('should fail with unmatching component types', () => {
    const elem = ReactTestRenderer.create(<Foo />)
    let failed = false
    try {
      expectElementToHaveType(elem.root, Bar)
    } catch (error) {
      failed = true
    }
    expect(failed).toBe(true)
  })
})
