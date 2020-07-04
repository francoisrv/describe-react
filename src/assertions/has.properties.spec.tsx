import { HasPropsProps } from "../components/Has"
import React from "react"
import { printProps, printElement } from "../print"
import { predicate } from "../utils"
import { create, ReactTestInstance } from "react-test-renderer"
import hasProperties from "./has.properties"
import Is from "../components/Is"

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
    {
      elem: create(<span id="foo" />).root,
      props: { property: T, which: <Is exactly="foo" /> },
      expected: true
    },
    {
      elem: create(<span id="foo" />).root,
      props: { property: T, which: <Is exactly="bar" /> },
      expected: false
    },
    {
      elem: create(<span id="foo" />).root,
      props: { not: T, property: T, which: <Is exactly="foo" /> },
      expected: false
    },
    {
      elem: create(<span id="foo" />).root,
      props: { property: 'id', which: <Is exactly="foo" /> },
      expected: true
    },
    {
      elem: create(<span id="foo" />).root,
      props: { property: 'id', which: <Is exactly="bar" /> },
      expected: false
    },
    {
      elem: create(<span id="foo" />).root,
      props: { property: 'foo', which: <Is exactly="foo" /> },
      expected: false
    },
    {
      elem: create(<span id="foo" title="abc" tabIndex={ 7 } />).root,
      props: { properties: { id: 'foo', title: 'abc' } },
      expected: true
    },
    {
      elem: create(<span id="foo" title="abc" tabIndex={ 7 } />).root,
      props: { properties: { id: 'foo', title: '7' } },
      expected: false
    },
    {
      elem: create(<span id="foo" title="abc" tabIndex={ 7 } />).root,
      props: { exact: T, properties: { title: 'abc', tabIndex: 7, id: 'foo' } },
      expected: true
    },
    {
      elem: create(<span id="foo" title="abc" tabIndex={ 7 } />).root,
      props: { exact: T, properties: { id: 'foo', title: 'ac' } },
      expected: false
    },
  ]
  tests.forEach(makeTest)
})
