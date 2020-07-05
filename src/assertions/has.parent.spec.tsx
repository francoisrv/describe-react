import Has, { HasChildrenProps, HasParentProps } from "../components/Has"
import React from "react"
import { printProps, printElement } from "../print"
import { predicate } from "../utils"
import { create, ReactTestInstance } from "react-test-renderer"
import hasChildren from "./has.children"
import Have from "../components/Have"
import hasParent from "./has.parent"

const T = true

describe('Has parent', () => {
  interface Test {
    elem: ReactTestInstance
    props: HasParentProps
    expected: boolean,
    useParent?: boolean
  }
  function makeTest(t: Test, i: number) {
    it(`#${ i } - ${ printElement(t.elem) } has ${ printProps(t.props) } should ${ t.expected ? 'pass' : 'fail' }`, () => {
      const elem = t.useParent ? t.elem : t.elem.children[0]
      expect(predicate(() => hasParent(elem as ReactTestInstance, t.props))).toBe(t.expected)
    })
  }
  const tests: Test[] = [
    {
      elem: create(<div><span /></div>).root,
      props: { parent: T },
      expected: true
    },
    {
      elem: create(<div><span /></div>).root,
      props: { parent: T },
      expected: false,
      useParent: true
    },
    {
      elem: create(<div><span /></div>).root,
      props: { parent: 'div' },
      expected: true
    },
    {
      elem: create(<div><span /></div>).root,
      props: { parent: 'span' },
      expected: false
    },
    {
      elem: create(<div><span /></div>).root,
      props: { not: T, parent: T },
      expected: true,
      useParent: true
    },
    {
      elem: create(<div><span /></div>).root,
      props: { not: T, parent: T },
      expected: false,
    },
    {
      elem: create(<div><span /></div>).root,
      props: { not: T, parent: 'span' },
      expected: true
    },
    {
      elem: create(<div><span /></div>).root,
      props: { not: T, parent: 'div' },
      expected: false
    },
    {
      elem: create(<div><span /></div>).root,
      props: { no: T, parent: T },
      expected: true,
      useParent: true
    },
    {
      elem: create(<div><span /></div>).root,
      props: { no: T, parent: T },
      expected: false,
    },
    {
      elem: create(<div><span /></div>).root,
      props: { no: T, parent: 'span' },
      expected: true
    },
    {
      elem: create(<div><span /></div>).root,
      props: { no: T, parent: 'div' },
      expected: false
    },
  ]
  tests.forEach(makeTest)
})
