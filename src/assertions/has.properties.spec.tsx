import { HasPropsProps } from "../components/Has"
import React from "react"
import { printProps, printElement } from "../print"
import { predicate } from "../utils"
import { create, ReactTestInstance } from "react-test-renderer"
import hasProperties from "./has.properties"

const T = true

describe('Has properties', () => {
  interface Test {
    elem: ReactTestInstance
    props: HasPropsProps
    expected: boolean
  }
  function makeTest(t: Test, i: number) {
    it(`#${ i } - ${ printElement(t.elem) } has ${ printProps(t.props) } should ${ t.expected ? 'pass' : 'fail' }`, () => {
      expect(predicate(() => hasProperties(t.elem, t.props))).toBe(t.expected)
    })
  }
  const tests: Test[] = [
    {
      elem: create(<span id="foo" />).root,
      props: { properties: T },
      expected: true
    },
    {
      elem: create(<span />).root,
      props: { properties: T },
      expected: false
    },
    {
      elem: create(<span />).root,
      props: { not: T, properties: T },
      expected: true
    },
    {
      elem: create(<span id="foo" />).root,
      props: { not: T, properties: T },
      expected: false
    },
    {
      elem: create(<span />).root,
      props: { no: T, properties: T },
      expected: true
    },
    {
      elem: create(<span id="foo" />).root,
      props: { no: T, properties: T },
      expected: false
    },
    {
      elem: create(<span id="foo" />).root,
      props: { property: 'id' },
      expected: true
    },
    {
      elem: create(<span id="foo" />).root,
      props: { property: 'title' },
      expected: false
    },
  ]
  tests.forEach(makeTest)
})
