import { HasTypeProps } from "../components/Has"
import React from "react"
import { printProps } from "../print"
import hasType from "./has.type"
import { predicate } from "../utils"
import { create, ReactTestInstance } from "react-test-renderer"
import Is from "../components/Is"

describe('Has type', () => {
  interface Test {
    elem: ReactTestInstance
    props: HasTypeProps
    expected: boolean
  }
  function makeTest(t: Test, i: number) {
    it(`#${ i } ${ printProps(t.props) }`, () => {
      expect(predicate(() => hasType(t.elem, t.props))).toBe(t.expected)
    })
  }
  const tests: Test[] = [
    {
      elem: create(<span />).root,
      props: { type: 'span' },
      expected: true
    },
    {
      elem: create(<span />).root,
      props: { type: 'div' },
      expected: false
    },
    {
      elem: create(<span />).root,
      props: { not: true, type: 'div' },
      expected: true
    },
    {
      elem: create(<span />).root,
      props: { not: true, type: 'span' },
      expected: false
    },
    {
      elem: create(<span />).root,
      props: { type: true, which: <Is exactly="span" />  },
      expected: true
    },
    {
      elem: create(<span />).root,
      props: { type: true, which: <Is exactly="div" />  },
      expected: false
    },
  ]
  tests.forEach(makeTest)
})
