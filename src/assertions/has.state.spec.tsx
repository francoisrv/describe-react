import { HasPropsProps, HasStateProps } from "../components/Has"
import React from "react"
import { printProps, printElement } from "../print"
import { predicate } from "../utils"
import { create, ReactTestInstance } from "react-test-renderer"
import hasProperties from "./has.properties"
import Is from "../components/Is"
import hasState from "./has.state"

const T = true

class WithState extends React.Component {
  state = { counter: 0, selected: false }
  render() {
    return <div />
  }
}

class Stateless extends React.Component {
  render() {
    return <div />
  }
}

describe('Has state', () => {
  interface Test {
    elem: ReactTestInstance
    props: HasStateProps
    expected: boolean
  }
  function makeTest(t: Test, i: number) {
    it(`#${ i } - ${ printElement(t.elem) } has ${ printProps(t.props) } should ${ t.expected ? 'pass' : 'fail' }`, () => {
      expect(predicate(() => hasState(t.elem, t.props))).toBe(t.expected)
    })
  }
  const tests: Test[] = [
    {
      elem: create(<WithState />).root,
      props: { state: T },
      expected: true
    },
    {
      elem: create(<Stateless />).root,
      props: { state: T },
      expected: false
    },
    {
      elem: create(<Stateless />).root,
      props: { not: T, state: T },
      expected: true
    },
    {
      elem: create(<WithState />).root,
      props: { not: T, state: T },
      expected: false
    },
    {
      elem: create(<WithState />).root,
      props: { state: 'counter' },
      expected: true
    },
    {
      elem: create(<WithState />).root,
      props: { state: 'counter2' },
      expected: false
    },
    {
      elem: create(<WithState />).root,
      props: { state: 'counter', which: <Is a number /> },
      expected: true
    },
    {
      elem: create(<WithState />).root,
      props: { state: 'counter', which: <Is a string /> },
      expected: false
    },
    {
      elem: create(<WithState />).root,
      props: { state: 'counter2', which: <Is a number /> },
      expected: false
    },
    {
      elem: create(<WithState />).root,
      props: { state: T, which: <Is a number /> },
      expected: true
    },
    {
      elem: create(<WithState />).root,
      props: { state: T, which: <Is a string /> },
      expected: false
    },
    {
      elem: create(<WithState />).root,
      props: { not: T, state: T, which: <Is a string /> },
      expected: true
    },
    {
      elem: create(<WithState />).root,
      props: { not: T, state: T, which: <Is a number /> },
      expected: false
    },
  ]
  tests.forEach(makeTest)
})
