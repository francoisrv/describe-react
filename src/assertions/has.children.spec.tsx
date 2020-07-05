import Has, { HasChildrenProps } from "../components/Has"
import React from "react"
import { printProps, printElement } from "../print"
import { predicate } from "../utils"
import { create, ReactTestInstance } from "react-test-renderer"
import hasChildren from "./has.children"
import Have from "../components/Have"

const T = true

describe('Has children', () => {
  interface Test {
    elem: ReactTestInstance
    props: HasChildrenProps
    expected: boolean
  }
  function makeTest(t: Test, i: number) {
    it(`#${ i } - ${ printElement(t.elem) } has ${ printProps(t.props) } should ${ t.expected ? 'pass' : 'fail' }`, () => {
      expect(predicate(() => hasChildren(t.elem, t.props))).toBe(t.expected)
    })
  }
  const tests: Test[] = [
    {
      elem: create(<div><span /></div>).root,
      props: { children: T },
      expected: true
    },
    {
      elem: create(<div />).root,
      props: { children: T },
      expected: false
    },
    {
      elem: create(<div>hello</div>).root,
      props: { children: T },
      expected: true
    },
    {
      elem: create(<div />).root,
      props: { no: T, children: T },
      expected: true
    },
    {
      elem: create(<div><span /></div>).root,
      props: { no: T, children: T },
      expected: false
    },
    {
      elem: create(<div />).root,
      props: { not: T, children: T },
      expected: true
    },
    {
      elem: create(<div><span /></div>).root,
      props: { not: T, children: T },
      expected: false
    },
    {
      elem: create(<div><span /></div>).root,
      props: { children: 'span' },
      expected: true
    },
    {
      elem: create(<div><span /></div>).root,
      props: { children: 'div' },
      expected: false
    },
    {
      elem: create(<div><span /></div>).root,
      props: { children: T, which: <Have type="span" /> },
      expected: true
    },
    {
      elem: create(<div><span /></div>).root,
      props: { children: T, which: <Have type="div" /> },
      expected: false
    },
    {
      elem: create(<div><span /><span /><span /></div>).root,
      props: { exactly: 3, children: T, which: <Have type="span" /> },
      expected: true
    },
    {
      elem: create(<div><span /><span /><span /></div>).root,
      props: { exactly: 4, children: T, which: <Have type="span" /> },
      expected: false
    },
    {
      elem: create(<div><span /><span /><span /></div>).root,
      props: { not: T, exactly: 4, children: T, which: <Have type="span" /> },
      expected: true
    },
    {
      elem: create(<div><span /><span /><span /></div>).root,
      props: { not: T, exactly: 3, children: T, which: <Have type="span" /> },
      expected: false
    },
    {
      elem: create(<div><span /><span /><span /></div>).root,
      props: { at: T, least: 2, children: 'span' },
      expected: true
    },
    {
      elem: create(<div><span /><span /><span /></div>).root,
      props: { at: T, least: 4, children: 'span' },
      expected: false
    },
    {
      elem: create(<div><span /><span /><span /></div>).root,
      props: { not: T, at: T, least: 4, children: 'span' },
      expected: true
    },
    {
      elem: create(<div><span /><span /><span /></div>).root,
      props: { not: T, at: T, least: 3, children: 'span' },
      expected: false
    },
    {
      elem: create(<div><span /><span /><span /></div>).root,
      props: { more: T, than: 2, children: 'span' },
      expected: true
    },
    {
      elem: create(<div><span /><span /><span /></div>).root,
      props: { more: T, than: 3, children: 'span' },
      expected: false
    },
    {
      elem: create(<div><span /><span /><span /></div>).root,
      props: { no: T, more: T, than: 3, children: 'span' },
      expected: true
    },
    {
      elem: create(<div><span /><span /><span /></div>).root,
      props: { no: T, more: T, than: 3, children: 'span' },
      expected: true
    },
  ]
  tests.forEach(makeTest)
})
