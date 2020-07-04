import { HasTextProps } from "../components/Has"
import React from "react"
import { printProps, printGeneric, printElement } from "../print"
import { predicate } from "../utils"
import { create, ReactTestInstance } from "react-test-renderer"
import hasText from "./has.text"
import Is from "../components/Is"

const T = true

describe('Has text', () => {
  interface Test {
    elem: ReactTestInstance
    props: HasTextProps
    expected: boolean
  }
  function makeTest(t: Test, i: number) {
    it(`#${ i } - ${ printElement(t.elem) } has ${ printProps(t.props) } should ${ t.expected ? 'pass' : 'fail' }`, () => {
      expect(predicate(() => hasText(t.elem, t.props))).toBe(t.expected)
    })
  }
  const tests: Test[] = [
    {
      elem: create(<span>abc</span>).root,
      props: { text: T },
      expected: true
    },
    {
      elem: create(<span />).root,
      props: { text: T },
      expected: false
    },
    {
      elem: create(<span>{ '' }</span>).root,
      props: { text: T },
      expected: false
    },
    {
      elem: create(<span>abc</span>).root,
      props: { no: T, text: T },
      expected: false
    },
    {
      elem: create(<span />).root,
      props: { no: T, text: T },
      expected: true
    },
    {
      elem: create(<span>{ '' }</span>).root,
      props: { no: T, text: T },
      expected: true
    },
    {
      elem: create(<span>abc</span>).root,
      props: { text: 'abc' },
      expected: true
    },
    {
      elem: create(<span>abc</span>).root,
      props: { text: 'def' },
      expected: false
    },
    {
      elem: create(<span>abc</span>).root,
      props: { not: T, text: 'def' },
      expected: true
    },
    {
      elem: create(<span>abc</span>).root,
      props: { not: T, text: 'abc' },
      expected: false
    },
    {
      elem: create(<span>abc</span>).root,
      props: { no: T, text: 'def' },
      expected: true
    },
    {
      elem: create(<span>abc</span>).root,
      props: { no: T, text: 'abc' },
      expected: false
    },
    {
      elem: create(<span>{''}</span>).root,
      props: { text: 'abc', which: <Is empty /> },
      expected: true
    },
    {
      elem: create(<span />).root,
      props: { text: 'abc', which: [<Is empty />, <Is a string />] },
      expected: false
    },
  ]
  tests.forEach(makeTest)
})
