import { HasSiblingsProps } from "../components/Has"
import React from "react"
import { printProps, printElement } from "../print"
import { predicate } from "../utils"
import { create, ReactTestInstance } from "react-test-renderer"
import hasSibling from "./has.sibling"

const T = true

describe('Has parent', () => {
  interface Test {
    elem: ReactTestInstance
    props: HasSiblingsProps
    expected: boolean
    position: number
  }
  function makeTest(t: Test, i: number) {
    it(`#${ i } - ${ printElement(t.elem) } has ${ printProps(t.props) } should ${ t.expected ? 'pass' : 'fail' }`, () => {
      const elem = t.elem.children[t.position]
      expect(predicate(() => hasSibling(elem as ReactTestInstance, t.props))).toBe(t.expected)
    })
  }
  const tests: Test[] = [
    {
      elem: create(<div><span /><span /></div>).root,
      props: { siblings: T },
      expected: true,
      position: 0
    },
    {
      elem: create(<div><span /></div>).root,
      props: { siblings: T },
      expected: false,
      position: 0
    },
    {
      elem: create(<div><span /></div>).root,
      props: { not: T, siblings: T },
      expected: true,
      position: 0
    },
    {
      elem: create(<div><span /><span /></div>).root,
      props: { not: T, siblings: T },
      expected: false,
      position: 0
    },
    {
      elem: create(<div><span /><span /></div>).root,
      props: { siblings: 'span' },
      expected: true,
      position: 0
    },
    {
      elem: create(<div><span /><hr /></div>).root,
      props: { siblings: 'span' },
      expected: false,
      position: 0
    },
    {
      elem: create(<div><span /><hr /></div>).root,
      props: { not: T, siblings: 'span' },
      expected: true,
      position: 0
    },
    {
      elem: create(<div><span /><span /></div>).root,
      props: { not: T, siblings: 'span' },
      expected: false,
      position: 0
    },
    {
      elem: create(<div><span /><hr /></div>).root,
      props: { no: T, siblings: 'span' },
      expected: true,
      position: 0
    },
    {
      elem: create(<div><span /><span /></div>).root,
      props: { no: T, siblings: 'span' },
      expected: false,
      position: 0
    },
    {
      elem: create(<div><span /><span /><span /></div>).root,
      props: { exactly: 2, siblings: 'span' },
      expected: false,
      position: 1
    },
  ]
  tests.forEach(makeTest)
})
